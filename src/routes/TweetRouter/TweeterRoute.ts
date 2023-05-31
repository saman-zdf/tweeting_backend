import { createTweet, updateTweet } from '../../controller/TweetController/TweetController.js';
import { tryCatch } from '../../utils/tryCatch.js';
import { Router } from 'express';
import { tweetUpdateSchema, validateTweetUpdate } from '../../validation/Tweet/validation.js';
import { tweetUpdateAuthMiddleware } from '../../middleware/tweetUpdateAuthMiddleware.js';

const tweeterRouter = Router();

tweeterRouter.post('/', tryCatch(createTweet));

tweeterRouter.patch(
  '/:tweetId',
  [tweetUpdateAuthMiddleware, validateTweetUpdate(tweetUpdateSchema)],
  tryCatch(updateTweet),
);

export default tweeterRouter;
