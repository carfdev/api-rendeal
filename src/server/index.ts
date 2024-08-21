// server.ts
import { Elysia } from "elysia";
import { logger } from "@/services/logger";
import { adminRouter } from "@/admin";
import { getAsciiArt, getColoredText } from "./utils";

export class Server {
  private app: Elysia;

  constructor() {
    this.app = new Elysia();

    // Use middleware for logging
    this.app.use(logger());

    // Derive middleware for authentication
    this.app
      .derive(({ headers }) => {
        const authHeader = headers["authorization"];
        const token = authHeader?.startsWith("Bearer ")
          ? authHeader.slice(7)
          : undefined;
        return { token };
      })
      .get("/", () => "Welcome to Rendeal's Cleaning Service API!");

    // Group routes under /v1
    this.setupRoutes();
  }

  /**
   * Set up all the routes for the server.
   * @returns The instance of Elysia for method chaining.
   */
  private setupRoutes(): Elysia {
    return this.app.group("/v1", (app) => {
      app.use(adminRouter);
      // Add additional routers here
      return app;
    });
  }

  /**
   * Start the server and listen for incoming requests.
   * @returns A promise that resolves when the server starts successfully.
   */
  public async start(): Promise<void> {
    const port = Number(Bun.env.PORT) || 1337;
    try {
      await this.app.listen(port);
      const { hostname } = this.app.server || { hostname: "localhost" };

      // Create a custom message
      const message = `${getAsciiArt("Rendeal")}
${getColoredText("Welcome to Rendeal's Cleaning Service API!", "cyan")}
${getColoredText(`Server is running at http://${hostname}:${port}`, "yellow")}
${getColoredText("Cleaning your data with precision!", "gray")}
      `;

      console.log(message);
    } catch (error) {
      console.error("Error starting the server:", error);
      process.exit(1); // Exit the process with an error code
    }
  }
}
