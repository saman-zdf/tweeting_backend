import { Response, Request, NextFunction } from 'express';
import { verifyToken } from '../lib/jwt.js';
import UnauthorizedException from '../error/UnauthorizedException.js';
import { extractToken } from '../lib/extractToken.js';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const header = extractToken(req);
  if (!header || !header.startsWith('Bearer')) {
    throw new UnauthorizedException('Unauthorized');
  }
  const token = header.split(' ')[0];
  const decoded = await verifyToken(token);
  req.user = { userId: decoded.userId };

  next();
};
