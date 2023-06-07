import { Tweet } from '@prisma/client';

import { MAXIMUM_TWEET_LENGTH } from '../../constants/Constants.js';
import BadRequestException from '../../error/BadRequestException.js';
import UnauthorizedException from '../../error/UnauthorizedException.js';
import logger from '../../lib/common/Logger.js';
import TweetRepository from '../../repository/TweetRepository/TweetRepository.js';
import { TweetPayload } from '../../repository/TweetRepository/interface/TweetRepositoryInterface.js';

class CreateTweetService {
  private tweetRepository: TweetRepository;

  constructor() {
    this.tweetRepository = new TweetRepository();
  }

  async validate(payload: TweetPayload) {
    const { userId, content } = payload;

    if (!userId) {
      logger.error('Error, tweet-service - no userId - unauthorized');
      throw new UnauthorizedException('Unauthorized');
    }

    if (content.length > MAXIMUM_TWEET_LENGTH) {
      logger.error('Error, tweet-service - content exceed 300 chars ');
      throw new BadRequestException('Tweet content cannot exceed 300 characters.');
    }
  }

  async execute(payload: TweetPayload): Promise<Tweet> {
    await this.validate(payload);

    const createdTweet = await this.tweetRepository.createTweet(payload);

    logger.info('success - tweet-create - execute done.');
    return createdTweet;
  }
}

export default CreateTweetService;
