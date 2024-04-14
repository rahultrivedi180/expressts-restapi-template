import type { Logger } from "winston";
import type { GlobalErrorHandlerMiddleware } from "../middlewares/globalErrorHandler.middleware";
import type { AppRouter } from "../router";
import type { Router } from "express";

export interface AppDependencies {
  logger: Logger;
  host: string;
  port: string | number;
  appRouter: AppRouter;
  globalErrorHandlerMiddleware: GlobalErrorHandlerMiddleware;
}

export type Routers = {
  path: string;
  handlers: Router[];
}[];