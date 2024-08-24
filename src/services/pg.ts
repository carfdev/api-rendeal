import { Pool } from "pg";
import { createClient, RedisClientType } from "redis";
import {
  DBconfig,
  WhereType,
  SelectType,
  FindUniqueObject,
  CreateObject,
  UpdateObject,
} from "@/services/interfaces/IPG"; // Import types

// Helper function to parse the database URL
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

// Parse configuration from environment variables
const config = parseDatabaseUrl(Bun.env.DATABASE_URL || "");

// Class to handle PostgreSQL operations
class PostgresDB {
  private pool: Pool;

  constructor(config: DBconfig) {
    this.pool = new Pool(config);
  }

  /**
   * Execute a query and return the result.
   * @param query - SQL query string.
   * @param values - Values to be used in the query.
   * @returns Query result rows.
   */
  async query(query: string, values: any[]) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows;
    } finally {
      client.release();
    }
  }
}

// Class to handle Redis caching operations
class RedisCache {
  private client: RedisClientType;

  constructor(redisUrl: string) {
    this.client = createClient({ url: redisUrl, pingInterval: 5000 });
    this.client.connect().catch((err) => {
      console.error("Failed to connect to Redis:", err);
    });
  }

  /**
   * Get value from Redis by key.
   * @param key - Redis key.
   * @returns Cached value or null if not found.
   */
  async get(key: string) {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  /**
   * Set value in Redis with expiration.
   * @param key - Redis key.
   * @param value - Value to cache.
   * @param expiration - Expiration time in seconds.
   */
  async set(key: string, value: any, expiration: number) {
    await this.client.set(key, JSON.stringify(value), {
      EX: expiration,
      NX: true,
    });
  }

  async del(key: string) {
    await this.client.del(key);
  }
}

export class DB {
  private db: PostgresDB;
  private cache: RedisCache;

  constructor() {
    this.db = new PostgresDB(config);
    this.cache = new RedisCache(Bun.env.REDIS_URL as string);
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
      const cached = await this.cache.get(cacheKey);

      if (cached) {
        return cached;
      } else {
        // Query PostgreSQL
        const result = await this.db.query(query, values);
        const record = result[0] || null;

        // Cache the result in Redis
        if (record) {
          await this.cache.set(cacheKey, record, 3600); // Cache expiration time in seconds
        }

        return record;
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

  /**
   * Create a new record in the specified table.
   * @param table - The table to insert into.
   * @param data - The data to insert.
   * @returns The inserted record if successful, otherwise null.
   */
  private async createMethod(table: string, data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    // Build the SQL query
    const query = `
      INSERT INTO ${table} (${keys.join(", ")})
      VALUES (${keys.map((_, index) => `$${index + 1}`).join(", ")})
      RETURNING *;
    `;
    try {
      // Query PostgreSQL
      const result = await this.db.query(query, values);
      return result[0];
    } catch (error) {
      console.error("Database query failed:", error);
      return null;
    }
  }

  // Implement the create methods for each table
  create: CreateObject = {
    admins: async (data) => this.createMethod("public.admins", data),
    workers: async (data) => this.createMethod("public.workers", data),
    clients: async (data) => this.createMethod("public.clients", data),
    invoices: async (data) => this.createMethod("public.invoices", data),
  };

  /**
   * Update a record in the specified table.
   * @param table - The table to update.
   * @param where - The conditions for the update.
   * @param set - The fields to update.
   * @returns The updated record if successful, otherwise null.
   */

  private async updateMethod(
    table: string,
    where: WhereType,
    set: Record<string, any>
  ) {
    const keys = Object.keys(set);
    const values = Object.values(set);
    const whereKeys = Object.keys(where);
    const whereValues = Object.values(where);

    // Build the SQL query
    const query = `
      UPDATE ${table}
      SET ${keys.map((key, index) => `${key} = $${index + 1}`).join(", ")}
      WHERE ${whereKeys
        .map((key, index) => `${key} = $${index + 1 + keys.length}`)
        .join(" AND ")}
      RETURNING *;
    `;
    try {
      // Check Redis cache
      const cacheKey = `${table}_${whereValues.join("_")}`;
      const cached = await this.cache.get(cacheKey);
      // If the record is in the cache, delete it
      if (cached) {
        await this.cache.del(cacheKey);
      }

      // Query PostgreSQL
      const result = await this.db.query(query, [...values, ...whereValues]);
      const record = result[0] || null;
      // Cache the result in Redis
      await this.cache.set(cacheKey, record, 3600);
      // Return the updated record
      return record;
    } catch (error) {
      console.error("Database query failed:", error);
      return null;
    }
  }

  // Implement the update methods for each table
  update: UpdateObject = {
    admins: async (where, set) =>
      this.updateMethod("public.admins", where, set),
    workers: async (where, set) =>
      this.updateMethod("public.workers", where, set),
    clients: async (where, set) =>
      this.updateMethod("public.clients", where, set),
    invoices: async (where, set) =>
      this.updateMethod("public.invoices", where, set),
  };
}
