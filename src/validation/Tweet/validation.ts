import { Response, Request, NextFunction } from 'express';
import { z, AnyZodObject } from 'zod';
import { StatusCode } from '../../utils/StatusCodes.js';
import { TweetUpdatePayload } from '../../repository/TweetRepository/interface/TweetRepositoryInterface.js';
import { extractToken } from '../../lib/extractToken.js';
import { verifyToken } from '../../lib/jwt.js';
import { Logger } from '../../lib/common/Logger.js';

// Update Tweet:
export const tweetUpdateSchema = z.object({
  content: z.object({
    userId: z.number({ required_error: 'Decoded token is not valid.' }),
    content: z
      .string({ required_error: 'Tweet cannot be posted empty.' })
      .min(10, 'Please provide a minimum of 10 characters.')
      .max(300, 'Tweet content cannot exceed 300 characters.'),
    imageUrl: z.string().optional(),
    gifUrl: z.string().optional(),
  }),
});

export const validateTweetUpdate =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    // Just double checking that token has an ID in the route, before calling the controller
    const header = extractToken(req);
    const token = header?.split(' ')[1];
    const userId = verifyToken(token).id;
    const body: TweetUpdatePayload = req.body;

    const content = {
      userId,
      ...body,
    };

    try {
      await schema
        .parseAsync({
          content,
        })
        .then(() => {
          Logger.success('Validation passed.');
        });

      return next();
    } catch (error) {
      Logger.error('Validation Error');
      return res.status(StatusCode.BadRequest).json(error);
    }
  };
