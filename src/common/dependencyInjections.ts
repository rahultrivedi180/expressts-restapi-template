import { Environment } from "../environment";
import { AppDependencies } from "../interfaces/dependencyInterfaces";
import { GlobalErrorHandlerMiddleware } from "../middlewares/globalErrorHandler.middleware";
import { AppRouter } from "../router";
import { LoggerUtil } from "../utils/logger.util";

const { logger } = new LoggerUtil("main");
const { getEnvironmentConfig } = new Environment({ logger });
const globalErrorHandlerMiddleware = new GlobalErrorHandlerMiddleware({
  logger,
});

const { host, port } = getEnvironmentConfig();
const appRouter = new AppRouter({ logger });

export const appDependencies: AppDependencies = {
  appRouter,
  globalErrorHandlerMiddleware,
  host,
  logger,
  port,
};
