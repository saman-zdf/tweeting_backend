import { Request, Response } from 'express';
import { SignInPayload, UserPayload } from '../../repository/UserRepository/Interfaces/UserRepositoryInterface.js';
import { StatusCode } from '../../utils/StatusCodes.js';
import SignUpUserService from '../../service/User/SignUpUser.service.js';
import { Logger } from '../../lib/common/Logger.js';
import SignInUserService from '../../service/User/SignInUser.service.js';

export const signUp = async (req: Request, res: Response) => {
  Logger.log('controller - user - sign-up');
  const payload: UserPayload = req.body;
  const userInfo = await new SignUpUserService().execute(payload);
  if (userInfo) {
    Logger.endpoint('POST', StatusCode.Created, req.originalUrl);
  }
  res.status(StatusCode.Created).json({ user: userInfo });
};

export const signIn = async (req: Request, res: Response) => {
  Logger.log('controller - user - sign-in');
  // eslint-disable-next-line no-console

  const payload: SignInPayload = req.body;
  const userInfo = await new SignInUserService().execute(payload);
  if (userInfo) {
    Logger.endpoint('POST', StatusCode.Created, req.originalUrl);
  }
  res.status(StatusCode.OK).json({ user: userInfo });
};
