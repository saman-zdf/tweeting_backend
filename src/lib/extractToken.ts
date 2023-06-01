import { Request } from 'express';
import { verifyToken } from './jwt.js';

export const extractToken = (req: Request): string | null => {
  const header = req.get?.('Authorization');
  return header || null;
};

export const tokenDecoderAndInfoExtractor = async (req: Request) => {
  const header = extractToken(req);
  const token = header?.split(' ')[1];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userId = await verifyToken(token!)?.id;
  const tweetId = parseInt(req.params.tweetId, 10);
  const result: { userId?: number; token?: string; header?: string | undefined; tweetId?: number } = {
    userId,
    token,
    header: header,
  };

  if (tweetId) {
    result.tweetId = tweetId;
  }
  return result;
};
