import type { IPG } from "@/services/interfaces/IPG";
import { Pool } from "pg";
import { createClient } from "redis";

interface DBconfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

const parseDatabaseUrl = (dbUrl: string): DBconfig => {
  const url = new URL(dbUrl);
  return {
    user: url.username,
    host: url.hostname,
    database: url.pathname.slice(1),
    password: url.password,
    port: parseInt(url.port),
  };
};

const config = parseDatabaseUrl(process.env.DATABASE_URL || "");

export class PostgresDB implements IPG {
  private pool: Pool;
  private redis: any;
  constructor() {
    this.pool = new Pool(config);
    this.redis = createClient({
      url: process.env.REDIS_URL,
    });
  }

  async create(tableName: string, data: {}): Promise<any> {
    try {
      const client = await this.pool.connect();
      try {
        const id = crypto.randomUUID();
        const keys = Object.keys(data);
        const values = Object.values(data);
        keys.push("id");
        values.push(id);
        const query = `INSERT INTO public."${tableName}" (${keys.join(
          ", "
        )}) VALUES (${keys
          .map((_, index) => "$" + (index + 1))
          .join(", ")}) RETURNING *`;
        const result = await client.query(query, values);
        return result.rows[0];
      } finally {
        client.release();
      }
    } catch (error: any) {
      return {
        message: error.message,
      };
    }
  }

  async findUnique(tableName: string, where: {}): Promise<any> {
    const keys = Object.keys(where);
    const values = Object.values(where);
    const query = `SELECT * FROM public."${tableName}" WHERE ${keys
      .map((_, index) => `${keys[index]} = $${index + 1}`)
      .join(" AND ")}`;

    try {
      await this.redis.connect();
      const cached = await this.redis.get(`${tableName}_${keys}_${values}`);
      if (cached) {
        await this.redis.quit();
        return JSON.parse(cached);
      } else {
        await this.redis.quit();

        const client = await this.pool.connect();
        try {
          const result = await client.query(query, values);
          await this.redis.connect();
          await this.redis.set(
            `${tableName}_${keys}_${values}`,
            JSON.stringify(result.rows[0])
          );
          await this.redis.quit();
          return result.rows[0];
        } finally {
          client.release();
          await this.redis.quit();
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
