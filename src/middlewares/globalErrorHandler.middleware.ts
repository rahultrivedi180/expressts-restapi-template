import type { NextFunction, Request, Response } from "express";
import {
  CommonDependencyInjector,
  type CommonDependencies,
} from "../common/commonDependencyInjector";
import {
  BadRequestError,
  ConflictError,
  DatabaseError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/error.util";
import { type ResponseUtil } from "../utils/response.util";

interface GlobalErrorHandlerMiddlewareDependencies extends CommonDependencies {
  ResponseUtil: typeof ResponseUtil;
}

export class GlobalErrorHandlerMiddleware extends CommonDependencyInjector {
  private ResponseUtil;
  private logger;

  constructor(
    globalErrorHandlerMiddlewareDependencies: GlobalErrorHandlerMiddlewareDependencies
  ) {
    const { ResponseUtil, logger } =
      globalErrorHandlerMiddlewareDependencies;
    super({ logger });
    this.ResponseUtil = ResponseUtil;
    this.logger = logger;

    this.handle = this.handle.bind(this);
    this.logger.info("The GlobalErrorHandler middleware has been initialized.");
  }

  handle(
    error: Error,
    request: Request,
    response: Response,
    nextFunction: NextFunction
  ) {
    if (error instanceof BadRequestError) {
      return this.ResponseUtil.badRequestResponse(response, {
        code: error.code,
        message: error.message,
      });
    }

    if (error instanceof UnauthorizedError) {
      return this.ResponseUtil.unauthorizedResponse(response, {
        code: error.code,
        message: error.message,
      });
    }

    if (error instanceof NotFoundError) {
      return this.ResponseUtil.notFoundResponse(response, {
        code: error.code,
        message: error.message,
      });
    }

    if (error instanceof ConflictError) {
      return this.ResponseUtil.conflictResponse(response, {
        code: error.code,
        message: error.message,
      });
    }

    if (error instanceof DatabaseError) {
      return this.ResponseUtil.databaseErrorResponse(response, {
        code: error.code,
        message: error.message,
      });
    }

    if (error instanceof InternalServerError) {
      this.logger.error(
        `Internal server error has occured. message: ${error.message} code: ${error.code} stack: ${error.stack}`
      );
      return this.ResponseUtil.internalServerErrorResponse(response, {
        code: error.code,
        message: error.message,
      });
    }

    this.logger.error(
      `Internal server error has occured. message: ${error.message} stack: ${error.stack}`
    );

    return this.ResponseUtil.internalServerErrorResponse(response, {
      code: "E500",
      message: "Something Went Wrong",
    });
  }
}
