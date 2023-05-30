import { Response, Request, NextFunction } from 'express';
import { verifyToken } from '../lib/jwt.js';
import UnauthorizedException from '../error/UnauthorizedException.js';
import { extractToken } from '../lib/extractToken.js';
import { Logger } from '../lib/common/Logger.js';

export interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const header = extractToken(req);
    const token = header.split(' ')[1];
    if (!header || !header.startsWith('Bearer') || !token) {
      Logger.error('Error, missing bearer token');
      throw new UnauthorizedException('Unauthorized');
    }

    const decoded = verifyToken(token);
    req.user = { userId: decoded.id };

    next();
  } catch (error) {
    res.status(error.code).send('Unauthorized');
  }
};
