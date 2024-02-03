import type { NextFunction, Request, Response } from "express";
import type { CommonDependencies } from "../common/commonDependencyInjector";
import { CommonDependencyInjector } from "../common/commonDependencyInjector";

interface GlobalErrorHandlerMiddlewareDependencies extends CommonDependencies {}

export class GlobalErrorHandlerMiddleware extends CommonDependencyInjector {
  private logger;

  constructor(
    globalErrorHandlerMiddlewareDependencies: GlobalErrorHandlerMiddlewareDependencies
  ) {
    const { logger } = globalErrorHandlerMiddlewareDependencies;
    super({ logger });
    this.logger = logger;

    this.handle = this.handle.bind(this);
    this.logger.info('The GlobalErrorHandler middleware has been initialized.');
  }

  handle(
    error: Error,
    request: Request,
    response: Response,
    nextFunction: NextFunction
  ) {
    this.logger.error(
      `A global error has occured: ${error.message}. Stack: ${error.stack}`
    );
    return response
      .status(500)
      .json({ message: error.message ?? "Something Went Wrong" });
  }
}
