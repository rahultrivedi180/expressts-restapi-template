abstract class CustomError extends Error {
  public code;
  constructor(message: string, code: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends CustomError { }
export class UnauthorizedError extends CustomError { }
export class NotFoundError extends CustomError { }
export class ConflictError extends CustomError { }
export class DatabaseError extends CustomError { }
export class InternalServerError extends CustomError { }

