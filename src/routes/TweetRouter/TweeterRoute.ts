import {
  createTweet,
  getAllTweets,
  getUserLatestTweet,
  updateTweet,
} from '../../controller/TweetController/TweetController.js';
import { tryCatch } from '../../utils/tryCatch.js';
import { Router } from 'express';
import { tweetCreateSchema, tweetUpdateSchema, twitterPayloadValidation } from '../../validation/Tweet/validation.js';
import { tweetUpdateAuthMiddleware } from '../../middleware/tweetUpdateAuthMiddleware.js';
import { authMiddleware } from '../../middleware/authorizationMiddleware.js';

const tweeterRouter = Router();

tweeterRouter.post('/', [authMiddleware, twitterPayloadValidation(tweetCreateSchema)], tryCatch(createTweet));

tweeterRouter.patch(
  '/:tweetId',
  [authMiddleware, tweetUpdateAuthMiddleware, twitterPayloadValidation(tweetUpdateSchema)],
  tryCatch(updateTweet),
);

tweeterRouter.get('/', tryCatch(getAllTweets));
tweeterRouter.get('/userIds', tryCatch(getUserLatestTweet));

export default tweeterRouter;
