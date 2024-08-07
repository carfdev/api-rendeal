import { Elysia } from "elysia";
import {
  createWorkerController,
  loginWorkerController,
  getMeWorkerController,
} from "@/worker/infraestructure/dependencies";
import {
  createWorkerDTO,
  loginWorkerDTO,
} from "@/worker/infraestructure/workerDTO";

export const workerRouter = new Elysia({ prefix: "/worker" })
  .post(
    "/",
    createWorkerController.handle.bind(createWorkerController),
    createWorkerDTO
  )
  .post(
    "/login",
    loginWorkerController.handle.bind(loginWorkerController),
    loginWorkerDTO
  )
  .get("/me", getMeWorkerController.handle.bind(getMeWorkerController));
