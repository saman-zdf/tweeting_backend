import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { StatusCode } from "../utils/StatusCodes.js";
import BadRequestException from "../error/BadRequestException.js";
import NotFoundException from "../error/NotFoundException.js";
import UnauthenticatedException from "../error/unauthenticatedException.js";
import UnauthorizedException from "../error/UnauthorizedException.js";

enum ErrorKey {
  Code = "P2002",
  Email = "users_email_key",
}

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const defaultError = {
    code: err.code || StatusCode.InternalServerError,
    msg: err.message || "Something went wrong, try again later!",
  };

  if (err instanceof BadRequestException)
    defaultError.code = StatusCode.BadRequest;
  if (err instanceof NotFoundException) defaultError.code = StatusCode.NotFound;
  if (err instanceof UnauthenticatedException)
    defaultError.code = StatusCode.Unauthenticated;
  if (err instanceof UnauthorizedException)
    defaultError.code = StatusCode.Unauthorized;

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code && err.code === ErrorKey.Code) {
      defaultError.code = StatusCode.BadRequest;

      defaultError.msg = `User with email ${req.body?.email} already in use. Please try with different email or simply login.`;
    }
  }
  res.status(defaultError.code).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
