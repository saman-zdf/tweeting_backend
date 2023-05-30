import { Response, Request, NextFunction } from "express";
import { verifyToken } from "../lib/jwt.js";
import UnauthorizedException from "../error/UnauthorizedException.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const header = req.headers["authorization"];
  if (!header || !header.startsWith("Bearer")) {
    throw new UnauthorizedException("Unauthorized");
  }

  const token = header.split(" ")[0];
  try {
    const payload = await verifyToken(token);
    // TODO: How to append the userId to the request??
    // req.user = {}

    next();
  } catch (error) {
    throw new UnauthorizedException("Unauthorized");
  }
};
