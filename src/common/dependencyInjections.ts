import { Environment } from "../environment";
import type { AppDependencies, Routers } from "../interfaces/dependencyInterfaces";
import { GlobalErrorHandlerMiddleware } from "../middlewares/globalErrorHandler.middleware";
import { AppRouter } from "../router";
import { LoggerUtil } from "../utils/logger.util";
import { ResponseUtil } from "../utils/response.util";

const { logger } = new LoggerUtil("main");
const { getEnvironmentConfig } = new Environment({ logger });
const globalErrorHandlerMiddleware = new GlobalErrorHandlerMiddleware({
  logger,
  ResponseUtil
});

const { host, port } = getEnvironmentConfig();

const routers: Routers = [];
const appRouter = new AppRouter({ logger, routers });

export const appDependencies: AppDependencies = {
  appRouter,
  globalErrorHandlerMiddleware,
  host,
  logger,
  port,
};
