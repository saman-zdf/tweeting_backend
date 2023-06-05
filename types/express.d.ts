/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Express {
  interface Request {
    user?: {
      userId?: number | string;
    };
    query?: {
      userIds?: string | undefined;
      userId?: string | undefined;
      tweetId?: string | undefined;
    };
  }
}
