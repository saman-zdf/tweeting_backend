import { Response } from 'express';
import CreateTweetService from '../../service/Tweet/CreateTweet.service.js';
import { StatusCode } from '../../utils/StatusCodes.js';
import { TweetPayload } from '../../repository/TweetRepository/interface/TweetRepositoryInterface.js';
import { Logger } from '../../lib/common/Logger.js';
import UpdateTweetService from '../../service/Tweet/UpdateTweet.service.js';
import { AuthenticatedRequest } from '../../utils/types/authTypes.js';

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

  res.status(StatusCode.Created).json({ tweet: createdTweet });
};

// Update tweet
export const updateTweet = async (req: AuthenticatedRequest, res: Response) => {
  const userId = parseInt(req.user.userId, 10);
  const tweetId = parseInt(req.params.tweetId, 10);
  // TODO: I need to check the userId against tweet in question to update and if the userId from auth does not match the tweet in question to update userId, throw an Error and Log the user out and redirect to login page.

  const { content, imageUrl, gifUrl }: TweetPayload = req.body;
  const payload = {
    tweetId,
    userId,
    content,
    imageUrl,
    gifUrl,
  };
  const updatedTweet = await new UpdateTweetService().execute(payload);
  if (updatedTweet) {
    Logger.endpoint('Patch', StatusCode.OK, req.originalUrl);
  }
  res.status(StatusCode.OK).json({ tweet: updatedTweet });
};
