import { Response, Request } from 'express';
import CreateTweetService from '../../service/Tweet/CreateTweet.service.js';
import { StatusCode } from '../../utils/StatusCodes.js';
import { TweetPayload } from '../../repository/TweetRepository/interface/TweetRepositoryInterface.js';
import { Logger } from '../../lib/common/Logger.js';
import UpdateTweetService from '../../service/Tweet/UpdateTweet.service.js';
import GetAllTweetsService from '../../service/Tweet/GetAllTweets.service.js';
import GetUserLatestTweetService from '../../service/Tweet/GetUserLatestTweet.service.js';

// Create tweet
export const createTweet = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req?.user?.userId, 10);

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
export const updateTweet = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req?.user?.userId, 10);
  const tweetId = parseInt(req.params.tweetId, 10);

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
    Logger.endpoint('PATCH', StatusCode.OK, req.originalUrl);
  }
  res.status(StatusCode.OK).json({ tweet: updatedTweet });
};

// Get all tweets
export const getAllTweets = async (req: Request, res: Response) => {
  const tweets = await new GetAllTweetsService().execute();

  if (tweets.length) {
    Logger.endpoint('GET', StatusCode.OK, req.originalUrl);
  }

  res.status(StatusCode.OK).json({ tweets });
};

// Get user latest tweets

export const getUserLatestTweet = async (req: Request, res: Response) => {
  const userIds = req.query.userIds as string;
  const userIdsToNumber = userIds.split(',').map(Number);

  const usersLatestTweet = await new GetUserLatestTweetService().execute(userIdsToNumber);

  if (usersLatestTweet?.length) {
    Logger.endpoint('GET', StatusCode.OK, req.originalUrl);
  }

  res.status(StatusCode.OK).json({ usersLatestTweet });
};
