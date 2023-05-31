import { Request } from 'express';
import { verifyToken } from './jwt.js';
import { AuthenticatedRequest } from '../utils/types/authTypes.js';

export const extractToken = (req: Request): string | null => {
  const header = req.get?.('Authorization');
  return header;
};

export const tokenDecoderAndInfoExtractor = async (req: AuthenticatedRequest) => {
  const header = extractToken(req);
  const token = header?.split(' ')[1];
  const userId = await verifyToken(token)?.id;
  const tweetId = parseInt(req.params.tweetId, 10);
  const result: { userId: number; token: string; header: string; tweetId?: number } = { userId, token, header };

  if (tweetId) {
    result.tweetId = tweetId;
  }
  return result;
};
