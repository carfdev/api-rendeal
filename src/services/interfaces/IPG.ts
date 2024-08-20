// types.ts

// Configuration for the database connection
export interface DBconfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

// Types for query parameters and results
export type WhereType = Record<string, any>; // More specific type if structure is known
export type SelectType = Record<string, boolean | null>; // Field selection

export type FindUniqueReturnType<T> = Promise<T | null>;

export type FindUniqueObject = {
  admins: (
    where: WhereType,
    select: SelectType
  ) => FindUniqueReturnType<Record<string, any>>;
  workers: (
    where: WhereType,
    select: SelectType
  ) => FindUniqueReturnType<Record<string, any>>;
  clients: (
    where: WhereType,
    select: SelectType
  ) => FindUniqueReturnType<Record<string, any>>;
  invoices: (
    where: WhereType,
    select: SelectType
  ) => FindUniqueReturnType<Record<string, any>>;
};
