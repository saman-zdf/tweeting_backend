import { Request, Response } from 'express';

import logger from '../../lib/common/Logger.js';
import { SignInPayload, UserPayload } from '../../repository/UserRepository/Interfaces/UserRepositoryInterface.js';
import SignInUserService from '../../service/User/SignInUser.service.js';
import SignUpUserService from '../../service/User/SignUpUser.service.js';
import { StatusCode } from '../../utils/StatusCodes.js';

export const signUp = async (req: Request, res: Response) => {
  const payload: UserPayload = req.body;
  const userInfo = await new SignUpUserService().execute(payload);
  if (userInfo) {
    logger.info(`GET, status: ${StatusCode.Created}, endpoint: ${req.originalUrl}`);
  }
  res.status(StatusCode.Created).json({ user: userInfo });
};

export const signIn = async (req: Request, res: Response) => {
  const payload: SignInPayload = req.body;
  const userInfo = await new SignInUserService().execute(payload);
  if (userInfo) {
    logger.info(`GET, status: ${StatusCode.OK}, endpoint: ${req.originalUrl}`);
  }
  res.status(StatusCode.OK).json({ user: userInfo });
};
