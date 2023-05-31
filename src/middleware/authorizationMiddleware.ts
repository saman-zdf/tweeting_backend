import { Response, NextFunction } from 'express';
import { verifyToken } from '../lib/jwt.js';
import UnauthorizedException from '../error/UnauthorizedException.js';
import { tokenDecoderAndInfoExtractor } from '../lib/extractToken.js';
import { Logger } from '../lib/common/Logger.js';
import { StatusCode } from '../utils/StatusCodes.js';
import { AuthenticatedRequest } from '../utils/types/authTypes.js';

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { header, token } = await tokenDecoderAndInfoExtractor(req);
    if (!header || !header.startsWith('Bearer') || !token) {
      Logger.error('Error, missing bearer token');
      throw new UnauthorizedException('Unauthorized');
    }
    const decoded = verifyToken(token);
    req.user = { userId: decoded.id };
    next();
  } catch (error) {
    res.status(StatusCode.Unauthorized).json({ error: error.message });
  }
};
