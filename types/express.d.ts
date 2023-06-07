declare namespace Express {
  interface Request {
    user?: {
      userId?: string | number | undefined;
    };
    query?: {
      userIds?: string | undefined;
      userId?: string | undefined;
      tweetId?: string | undefined;
    };
  }
}
