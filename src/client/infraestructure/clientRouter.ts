import { Elysia } from "elysia";

import {
  createClientController,
  loginClientController,
} from "@/client/infraestructure/dependencies";
import {
  createClientDTO,
  loginClientDTO,
} from "@/client/infraestructure/clientDTO";

export const clientRouter = new Elysia({ prefix: "/client" })
  .post(
    "/",
    createClientController.handle.bind(createClientController),
    createClientDTO
  )
  .post(
    "/login",
    loginClientController.handle.bind(loginClientController),
    loginClientDTO
  );
