import { Response, NextFunction, Request } from 'express';
import { verifyToken } from '../lib/jwt.js';
import UnauthorizedException from '../error/UnauthorizedException.js';
import { tokenDecoderAndInfoExtractor } from '../lib/extractToken.js';
import { Logger } from '../lib/common/Logger.js';
import { StatusCode } from '../utils/StatusCodes.js';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { header, token } = await tokenDecoderAndInfoExtractor(req);
    if (!header || !header.startsWith('Bearer') || !token) {
      Logger.error('Error, missing bearer token');
      throw new UnauthorizedException('Unauthorized');
    }
    const decoded = verifyToken(token);

    req.user = { userId: decoded?.id };
    next();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(StatusCode.Unauthorized).json({ error: error?.message });
  }
};
