import http from "http";
import { App } from "./app";
import { appDependencies } from "./common/dependencyInjections";

async function main() {
  const { appRouter, globalErrorHandlerMiddleware, host, logger, port } =
    appDependencies;

  const app = await new App({
    appRouter,
    globalErrorHandlerMiddleware,
    host,
    logger,
    port,
  }).initialize();

  const httpServer = http.createServer(app).listen({ port, host });

  httpServer.on("listening", async () => {
    logger.info(`server listening to ${host}:${port}`);
  });

  process.on("unhandledRejection", (reason: Error) => {
    throw reason;
  });

  process.on("uncaughtException", (error: Error) => {
    logger.error(error.message);
    process.exit(1);
  });
}

main();
