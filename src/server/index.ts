import { Elysia } from "elysia";
import { workerRouter } from "@/worker";
import { clientRouter } from "@/client";
import { logger } from "@/services/logger";

export class Server {
  private app: Elysia;

  constructor() {
    this.app = new Elysia();
    this.app.use(logger());
    this.app.derive(({ headers }) => {
      const auth = headers["authorization"];
      const token = auth?.startsWith("Bearer ") ? auth.slice(7) : undefined;
      return { token };
    });
    this.app.group("/v1", (app) => app.use(workerRouter).use(clientRouter));
  }

  public start() {
    this.app.listen(process.env.PORT || 1337, () => {
      console.log(
        `🦊 Elysia is running at ${this.app.server?.hostname}:${this.app.server?.port}`
      );
    });
  }
}
