import type { Response } from "express";

export enum StatusCodes {
  "OK" = 200,
  "CREATED" = 201,
  "BAD_REQUEST" = 400,
  "UNAUTHORIZED" = 401,
  "NOT_FOUND" = 404,
  "CONFLICT" = 409,
  "INTERNAL_SERVER_ERROR" = 500,
}

interface SuccessJsonResponse {
  data: any;
  message: string;
}

interface ErrorJsonResponse {
  code: string;
  message: string;
}

export class ResponseUtil {
  static successResponse(response: Response, parameters: SuccessJsonResponse) {
    return response.status(StatusCodes.OK).json(parameters);
  }

  static createdResponse(response: Response, parameters: SuccessJsonResponse) {
    return response.status(StatusCodes.CREATED).json(parameters);
  }

  static badRequestResponse(response: Response, parameters: ErrorJsonResponse) {
    return response.status(StatusCodes.BAD_REQUEST).json(parameters);
  }

  static unauthorizedResponse(response: Response, parameters: ErrorJsonResponse) {
    return response.status(StatusCodes.UNAUTHORIZED).json(parameters);
  }

  static notFoundResponse(response: Response, parameters: ErrorJsonResponse) {
    return response.status(StatusCodes.NOT_FOUND).json(parameters);
  }

  static conflictResponse(response: Response, parameters: ErrorJsonResponse) {
    return response.status(StatusCodes.CONFLICT).json(parameters);
  }

  static databaseErrorResponse(response: Response, parameters: ErrorJsonResponse) {
    return response.status(StatusCodes.BAD_REQUEST).json(parameters);
  }
  
  static internalServerErrorResponse(response: Response, parameters: ErrorJsonResponse) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(parameters);
  }
}
