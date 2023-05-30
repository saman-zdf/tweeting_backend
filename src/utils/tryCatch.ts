import { NextFunction, Request, Response } from 'express';

export const tryCatch =
  (controller: { (req: Request, res: Response): Promise<void>; (arg0: unknown, arg1: unknown): unknown }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      return next(error);
    }
  };
