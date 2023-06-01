/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { AuthenticatedRequest } from './types/authTypes';

export const tryCatch =
  (controller: {
    (
      req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
      res: Response<any, Record<string, any>>,
    ): Promise<void>;
    (req: AuthenticatedRequest, res: Response<any, Record<string, any>>): Promise<void>;
    (
      req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
      res: Response<any, Record<string, any>>,
    ): Promise<void>;
    (
      req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
      res: Response<any, Record<string, any>>,
    ): Promise<void>;
    (
      req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
      res: Response<any, Record<string, any>>,
    ): Promise<void>;
    (
      req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
      res: Response<any, Record<string, any>>,
    ): Promise<void>;
    (
      arg0: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
      arg1: Response<any, Record<string, any>>,
    ): any;
  }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      return next(error);
    }
  };
