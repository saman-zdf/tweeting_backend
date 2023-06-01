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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.user = { userId: decoded?.id };
    next();
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.status(StatusCode.Unauthorized).json({ error: error?.message });
  }
};
