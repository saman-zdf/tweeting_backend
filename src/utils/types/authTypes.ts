import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

export interface RequestWithParams extends Request {
  req: {
    query: {
      userIds: string;
    };
  };
}
