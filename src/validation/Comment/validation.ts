import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, z } from 'zod';

import logger from '../../lib/common/Logger';
import { StatusCode } from '../../utils/StatusCodes';

export const commentSchema = z.object({
  tweetId: z.number({ required_error: 'Tweet ID is required.' }),
  content: z
    .string({ required_error: 'Content is required.' })
    .min(5, 'Please provide minimum of 5 characters.')
    .max(120, 'Comment content cannot exceed 120 characters.'),
});

export const commentPayloadValidation =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    const requestBody = req.body;

    const body = {
      tweetId: requestBody.tweetId,
      content: requestBody.content,
    };

    await schema
      .parseAsync({
        tweetId: body.tweetId,
        content: body.content,
      })
      .then(() => {
        logger.info('comment-schema - validation passed.');
        return next();
      })
      .catch((error) => {
        logger.error('comment-schema - validation Error');
        res.status(StatusCode.BadRequest).json(error);
      });
  };
