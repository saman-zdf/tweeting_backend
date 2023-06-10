import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, z } from 'zod';

import logger from '../../lib/common/Logger';
import { StatusCode } from '../../utils/StatusCodes';

export const replyCreateSchema = z.object({
  tweetId: z.number({ required_error: 'Tweet id is required.' }),
  commentId: z.number({ required_error: 'Comment id is required.' }),
  message: z
    .string({ required_error: 'Message is required and cannot be empty.' })
    .min(2, 'Please provie a minimum of 2 characters.')
    .max(300, 'Reply message cannot exceed 300 characters.'),
});

export const replySchemaValidation =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    const { message, tweetId, commentId } = req.body;
    await schema
      .parseAsync({
        tweetId,
        commentId,
        message,
      })
      .then(() => {
        logger.info('reply-schema-validation validation passed.');
        next();
      })
      .catch((error) => {
        res.status(StatusCode.BadRequest).json(error);
      });
  };
