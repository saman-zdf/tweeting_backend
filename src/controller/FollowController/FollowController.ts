import { Request, Response } from 'express';

import { UnauthenticatedException } from '../../error';
import logger from '../../lib/common/Logger';
import { extractToken } from '../../lib/extractToken';
import { verifyToken } from '../../lib/jwt';
import { FollowingUserPayload } from '../../repository/FollowRepository/interface/FollowRepositoryInterface';
import FollowingUserService from '../../service/Follow/FollowingUser.service';
import { StatusCode } from '../../utils/StatusCodes';

export const followingUser = async (req: Request, res: Response) => {
  const body: FollowingUserPayload = req.body;
  const header = extractToken(req);
  const token = header?.split(' ')[1];
  const userId = verifyToken?.(token!)?.id;

  if (userId !== body.userId) {
    throw new UnauthenticatedException('Not authenticated to follow other user.');
  }

  const followUser = await new FollowingUserService().execute(body);
  if (followUser) {
    logger.info(`POST, status: ${StatusCode.Created}, endpoint: ${req.originalUrl}`);
  }
  res.status(StatusCode.Created).json({ followUser });
};
