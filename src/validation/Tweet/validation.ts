import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, z } from 'zod';

import logger from '../../lib/common/Logger.js';
import { extractToken } from '../../lib/extractToken.js';
import { verifyToken } from '../../lib/jwt.js';
import { TweetUpdatePayload } from '../../repository/TweetRepository/interface/TweetRepositoryInterface.js';
import { StatusCode } from '../../utils/StatusCodes.js';

/* Tweet validation */
export const tweetCreateSchema = z.object({
  userId: z.number({ required_error: 'User Id is required.' }),
  content: z
    .string({ required_error: 'Tweet cannot be posted empty.' })
    .min(10, 'Please provide a minimum of 10 characters.')
    .max(280, 'Tweet content cannot exceed 300 characters.'),
  imageUrl: z.string().optional(),
  gifUrl: z.string().optional(),
});

export const tweetUpdateSchema = tweetCreateSchema;

export const twitterPayloadValidation =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    // Just double checking that token is valid and has the same userId and tweet in question to update. in the route, before calling the controller
    const header = extractToken(req);
    const token = header?.split(' ')[1];
    const userId = verifyToken?.(token!)?.id;
    const body: TweetUpdatePayload = req.body;
    const { content, imageUrl, gifUrl } = body;

    await schema
      .parseAsync({
        userId,
        content,
        imageUrl,
        gifUrl,
      })
      .then(() => {
        logger.info('tweet-auth-schema - validation passed.');
        return next();
      })
      .catch((error) => {
        logger.error('tweet-auth-schema - validation Error');
        res.status(StatusCode.BadRequest).json(error);
      });
  };
/* End of tweet validation */
