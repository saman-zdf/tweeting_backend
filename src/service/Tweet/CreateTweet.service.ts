import { Tweet } from '@prisma/client';
import BadRequestException from '../../error/BadRequestException.js';
import { Logger } from '../../lib/common/Logger.js';
import TweetRepository from '../../repository/TweetRepository/TweetRepository.js';
import { TweetPayload } from '../../repository/TweetRepository/interface/TweetRepositoryInterface.js';
import UnauthorizedException from '../../error/UnauthorizedException.js';
import { MAXIMUM_TWEET_LENGTH } from '../../constants/Constants.js';

class CreateTweetService {
  private tweetRepository: TweetRepository;

  constructor() {
    this.tweetRepository = new TweetRepository();
  }

  async validate(payload: TweetPayload) {
    const { userId, content } = payload;

    if (!userId) {
      Logger.error('Error, tweet-service - no userId - unauthorized');
      throw new UnauthorizedException('Unauthorized');
    }

    if (!content || content.length < 10) {
      Logger.error('Error, tweet-service - no content provided');

      throw new BadRequestException('Tweet cannot be posted empty. Please provide a minimum of 10 characters.');
    }

    if (content.length > MAXIMUM_TWEET_LENGTH) {
      Logger.error('Error, tweet-service - content exceed 300 chars ');
      throw new BadRequestException('Tweet content cannot exceed 300 characters.');
    }
  }

  async execute(payload: TweetPayload): Promise<Tweet> {
    Logger.log('tweet-service - tweet-create - execute start.');
    await this.validate(payload);

    const createdTweet = await this.tweetRepository.createTweet(payload);

    Logger.success('success - tweet-create - execute done.');
    return createdTweet;
  }
}

export default CreateTweetService;
