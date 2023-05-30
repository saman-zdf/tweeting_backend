import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../utils/StatusCodes.js';
import BadRequestException from '../error/BadRequestException.js';
import NotFoundException from '../error/NotFoundException.js';
import UnauthenticatedException from '../error/unauthenticatedException.js';
import UnauthorizedException from '../error/UnauthorizedException.js';

interface ErrorHandler extends Error {
  code: number;
}

const errorHandlerMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  const defaultError = {
    code: err.code || StatusCode.InternalServerError,
    msg: err.message || 'Something went wrong, try again later!',
  };

  if (err instanceof BadRequestException) defaultError.code = StatusCode.BadRequest;
  if (err instanceof NotFoundException) defaultError.code = StatusCode.NotFound;
  if (err instanceof UnauthenticatedException) defaultError.code = StatusCode.Unauthenticated;
  if (err instanceof UnauthorizedException) defaultError.code = StatusCode.Unauthorized;
  next();
  res.status(defaultError.code).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
