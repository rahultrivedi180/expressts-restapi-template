import http from "http";
import type { Logger } from "winston";
import { App } from "./app";
import { appDependencies } from "./common/dependencyInjections";

interface CloseServerParams {
  logger: Logger;
  server: http.Server;
}

async function closeServer(params: CloseServerParams) {
  const { logger, server } = params;
  server.close(() => {
    logger.info("HTTP server closed.");
    process.exit(0);
  });

  // Forcefully close connections after a timeout
  setTimeout(() => {
    logger.error("Forcing server shutdown");
    process.exit(1);
  }, 5000);
}

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

  process.on("SIGINT", async () => {
    closeServer({ logger, server: httpServer });
  });

  process.on("SIGTERM", async () => {
    closeServer({ logger, server: httpServer });
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
