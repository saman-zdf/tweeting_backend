import { NextFunction, Request, Response } from 'express';

import UnauthorizedException from '../error/UnauthorizedException.js';
import logger from '../lib/common/Logger.js';
import { tokenDecoderAndInfoExtractor } from '../lib/extractToken.js';
import { verifyToken } from '../lib/jwt.js';
import { StatusCode } from '../utils/StatusCodes.js';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { header, token } = await tokenDecoderAndInfoExtractor(req);
    if (!header || !header.startsWith('Bearer') || !token) {
      logger.error('Error, missing bearer token');
      throw new UnauthorizedException('Unauthorized');
    }
    const decoded = verifyToken(token);
    //TODO: Find a way to fix the error for user not exist? even adding namespace for Express and adding user to the Request type wouldn't resolve this issue.
    // @ts-ignore
    req.user = { userId: decoded?.id };
    next();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(StatusCode.Unauthorized).json({ error: error?.message });
  }
};
