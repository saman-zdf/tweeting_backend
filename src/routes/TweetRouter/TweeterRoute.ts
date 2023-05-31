import { createTweet, updateTweet } from '../../controller/TweetController/TweetController.js';
import { tryCatch } from '../../utils/tryCatch.js';
import { Router } from 'express';
import { tweetCreateSchema, tweetUpdateSchema, twitterPayloadValidation } from '../../validation/Tweet/validation.js';
import { tweetUpdateAuthMiddleware } from '../../middleware/tweetUpdateAuthMiddleware.js';

const tweeterRouter = Router();

tweeterRouter.post('/', [twitterPayloadValidation(tweetCreateSchema)], tryCatch(createTweet));

tweeterRouter.patch(
  '/:tweetId',
  [tweetUpdateAuthMiddleware, twitterPayloadValidation(tweetUpdateSchema)],
  tryCatch(updateTweet),
);

export default tweeterRouter;
