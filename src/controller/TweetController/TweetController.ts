import { Response } from 'express';
import CreateTweetService from '../../service/Tweet/CreateTweet.service.js';
import { StatusCode } from '../../utils/StatusCodes.js';
import { AuthenticatedRequest } from '../../middleware/authorizationMiddleware.js';
import { TweetPayload } from '../../repository/TweetRepository/interface/TweetRepositoryInterface.js';
import { Logger } from '../../lib/common/Logger.js';

// Create tweet
export const createTweet = async (req: AuthenticatedRequest, res: Response) => {
  const userId = parseInt(req.user.userId, 10);

  const { content, imageUrl, gifUrl }: TweetPayload = req.body;
  const payload = {
    userId,
    content,
    imageUrl,
    gifUrl,
  };

  const createdTweet = await new CreateTweetService().execute(payload);
  if (createdTweet) {
    Logger.endpoint('POST', StatusCode.Created, req.originalUrl);
  }

  res.status(StatusCode.Created).json({ content: createdTweet });
};
