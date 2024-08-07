import Elysia from "elysia";
import chalk from "chalk";

// Agregar color a los métodos HTTP
const methodColor = (method: string) => {
  switch (method) {
    case "GET":
      return chalk.green(method);
    case "POST":
      return chalk.blue(method);
    case "PUT":
      return chalk.yellow(method);
    case "DELETE":
      return chalk.red(method);
    default:
      return chalk.white(method);
  }
};

// Agregar color a los estados de respuesta
const statusColor = (status: any) => {
  if (status >= 200 && status < 300) return chalk.green(status);
  if (status >= 400 && status < 500) return chalk.yellow(status);
  if (status >= 500) return chalk.red(status);
  return chalk.white(status);
};

export const logger = ({ methods = ["GET", "PUT", "POST", "DELETE"] } = {}) =>
  new Elysia()
    .derive({ as: "global" }, () => ({ start: Date.now() }))
    .onBeforeHandle({ as: "global" }, (ctx) => {
      if (!methods.includes(ctx.request.method)) return;
    })
    .onAfterHandle({ as: "global" }, (ctx) => {
      if (!methods.includes(ctx.request.method)) return;
      console.log(
        methodColor(ctx.request.method),
        chalk.cyan(ctx.path),
        statusColor(ctx.set.status ?? 200),
        "in",
        chalk.magenta(Date.now() - ctx.start + " ms")
      );
    });
