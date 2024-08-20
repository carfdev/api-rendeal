import { Elysia } from "elysia";
import { DB } from "@/services/pg";

const db = new DB();

const getPrueba = async () => {
  return await db.findUnique.clients(
    { email: "client1@example.com" },
    { id: true }
  );
};

export const pruebaRouter = new Elysia({ prefix: "/prueba" }).get("/", () =>
  getPrueba()
);
