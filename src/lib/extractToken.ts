import { Request } from 'express';

export const extractToken = (req: Request): string | null => {
  const header = req.get('Authorization');
  return header;
};
