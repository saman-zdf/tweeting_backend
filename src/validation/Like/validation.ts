import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, z } from 'zod';

import logger from '../../lib/common/Logger';
import { StatusCode } from '../../utils/StatusCodes';

export const likeReplySchema = z.object({
  userId: z.number({ required_error: 'User id is required.' }),
  replyId: z.number({ required_error: 'Reply id is required.' }),
});

export const likeReplyValidation =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.query.userId as string, 10);
    const replyId = parseInt(req.query.replyId as string, 10);

    await schema
      .parseAsync({
        userId,
        replyId,
      })
      .then(() => {
        logger.info('like-comment-reply-schema validation passed');
        next();
      })
      .catch((error) => {
        logger.error('Error, like-comment-reply-schema validation failed.');
        res.status(StatusCode.BadRequest).json(error);
      });
  };
