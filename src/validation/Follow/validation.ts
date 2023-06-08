import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, z } from 'zod';

import logger from '../../lib/common/Logger';
import { FollowingUserPayload } from '../../repository/FollowRepository/interface/FollowRepositoryInterface';
import { StatusCode } from '../../utils/StatusCodes';

export const followingUserSchema = z.object({
  userId: z.number({ required_error: 'User id is required.' }),
  followingUserId: z.number({ required_error: 'Following user id is required.' }),
});

export const followingPayloadValidation =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    const { userId, followingUserId }: FollowingUserPayload = req.body;
    await schema
      .parseAsync({
        userId,
        followingUserId,
      })
      .then(() => {
        logger.info('following-user-schema - validation passed.');
        next();
      })
      .catch((error) => {
        logger.error('following-user-schema - validation Error.');
        res.status(StatusCode.BadRequest).json(error);
      });
  };
