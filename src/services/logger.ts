import Elysia from "elysia";
import { getColoredText } from "@/server/utils";

// Logger middleware for logging API requests and their processing time
export const logger = ({ methods = ["GET", "PUT", "POST", "DELETE"] } = {}) =>
  new Elysia()
    .derive({ as: "global" }, () => ({ start: Date.now() })) // Store the start time of the request
    .onAfterHandle({ as: "global" }, (ctx) => {
      // Skip logging if the request method is not in the allowed methods list
      if (!methods.includes(ctx.request.method)) return;

      // Calculate the time taken to process the request
      const duration = Date.now() - ctx.start;

      // Log the method, path, status, and duration of the request with color
      console.log(
        `${getColoredText(ctx.request.method, "blue")} ${getColoredText(
          ctx.path,
          "cyan"
        )} - ${getColoredText(
          (ctx.set.status as string) ?? 200,
          "green"
        )} in ${getColoredText(duration + " ms", "yellow")}`
      );
    });
