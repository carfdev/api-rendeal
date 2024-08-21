import { Elysia } from "elysia";

import { loginController } from "./dependencies";

import { loginAdminDTO } from "./adminDTO";

export const adminRouter = new Elysia({ prefix: "/admin" }).post(
  "/login",
  loginController.handle.bind(loginController),
  loginAdminDTO
);
