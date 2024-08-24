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

// Return type for findUnique methods
export type FindUniqueReturnType<T> = Promise<T | null>;

// Generic FindUniqueObject interface for different table types
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

// Generic CreateObject interface for different table types
export type CreateObject = {
  admins: (data: Record<string, any>) => Promise<Record<string, any>>;
  workers: (data: Record<string, any>) => Promise<Record<string, any>>;
  clients: (data: Record<string, any>) => Promise<Record<string, any>>;
  invoices: (data: Record<string, any>) => Promise<Record<string, any>>;
};

// Generic UpdateObject interface for different table types
export type UpdateObject = {
  admins: (
    where: WhereType,
    set: WhereType
  ) => FindUniqueReturnType<Record<string, any>>;
  workers: (
    where: WhereType,
    set: WhereType
  ) => FindUniqueReturnType<Record<string, any>>;
  clients: (
    where: WhereType,
    set: WhereType
  ) => FindUniqueReturnType<Record<string, any>>;
  invoices: (
    where: WhereType,
    set: WhereType
  ) => FindUniqueReturnType<Record<string, any>>;
};
