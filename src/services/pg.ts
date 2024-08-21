import { Pool } from "pg";
import { createClient, RedisClientType } from "redis";
import {
  DBconfig,
  WhereType,
  SelectType,
  FindUniqueObject,
} from "@/services/interfaces/IPG"; // Import types

// Parse the database URL into configuration object
const parseDatabaseUrl = (url: string): DBconfig => {
  const databaseUrl = new URL(url);
  return {
    host: databaseUrl.hostname,
    port: Number(databaseUrl.port),
    user: databaseUrl.username,
    password: databaseUrl.password,
    database: databaseUrl.pathname.slice(1),
  };
};

// Parse the database configuration from environment variables
const config = parseDatabaseUrl(Bun.env.DATABASE_URL || "");

export class DB {
  private pool: Pool;
  private redis: RedisClientType;

  constructor() {
    // Initialize PostgreSQL pool
    this.pool = new Pool(config);

    // Initialize Redis client and connect
    this.redis = createClient({ url: Bun.env.REDIS_URL, pingInterval: 3000 });
    this.setupRedisListeners();
    this.redis.connect().catch((err) => {
      console.error("Failed to connect to Redis:", err);
    });
  }

  private setupRedisListeners() {
    // Log connection errors
    this.redis.on("error", (err) => {});

    // Attempt reconnection on disconnection
    this.redis.on("end", () => {});

    // Handle reconnection attempts
    this.redis.on("reconnecting", () => {});

    // Log successful reconnection
    this.redis.on("connect", () => {});
  }

  /**
   * Find a unique record in the specified table.
   * @param table - The table to query.
   * @param where - The conditions for the query.
   * @param select - The fields to select.
   * @returns The record if found, otherwise null.
   */
  private async findUniqueMethod(
    table: string,
    where: WhereType,
    select: SelectType
  ) {
    const keys = Object.keys(where);
    const values = Object.values(where);
    const selectKeys = Object.keys(select).filter(
      (key) => select[key] !== null
    );

    // Build the SQL query
    const query = `
      SELECT ${selectKeys.join(", ")}
      FROM ${table}
      WHERE ${keys.map((key, index) => `${key} = $${index + 1}`).join(" AND ")}
      LIMIT 1;
    `;

    try {
      // Check Redis cache
      const cacheKey = `${table}_${values.join("_")}`;
      const cached = await this.redis.get(cacheKey);

      if (cached) {
        return JSON.parse(cached);
      } else {
        // Query PostgreSQL
        const client = await this.pool.connect();
        try {
          const result = await client.query(query, values);
          const record = result.rows[0] || null;

          // Cache the result in Redis
          if (record) {
            await this.redis.set(cacheKey, JSON.stringify(record), {
              EX: 3600, // Cache expiration time in seconds
              NX: true, // Only set the key if it doesn't already exist
            });
          }

          return record;
        } finally {
          client.release();
        }
      }
    } catch (error) {
      console.error("Database query failed:", error);
      return null;
    }
  }

  // Implement the findUnique methods for each table
  findUnique: FindUniqueObject = {
    admins: async (where, select) =>
      this.findUniqueMethod("public.admins", where, select),
    workers: async (where, select) =>
      this.findUniqueMethod("public.workers", where, select),
    clients: async (where, select) =>
      this.findUniqueMethod("public.clients", where, select),
    invoices: async (where, select) =>
      this.findUniqueMethod("public.invoices", where, select),
  };
}
