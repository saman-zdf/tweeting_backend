import { createTweet } from '../../controller/TweetController/TweetController.js';
import { tryCatch } from '../../utils/tryCatch.js';
import { Router } from 'express';

const tweeterRouter = Router();

tweeterRouter.post('/', tryCatch(createTweet));

export default tweeterRouter;
