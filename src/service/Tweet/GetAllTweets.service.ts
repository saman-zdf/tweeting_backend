import { Logger } from '../../lib/common/Logger.js';
import BadRequestException from '../../error/BadRequestException.js';
import TweetRepository from '../../repository/TweetRepository/TweetRepository.js';
import { Tweet } from '@prisma/client';

class GetAllTweetsService {
  private tweetRepository: TweetRepository;

  constructor() {
    this.tweetRepository = new TweetRepository();
  }

  async validate(tweets: Tweet[]) {
    if (!tweets.length) {
      Logger.error('Error, tweets-length - zero');
      throw new BadRequestException('There are no tweets at the moment.');
    }
  }

  async execute() {
    const tweets = await this.tweetRepository.getAllTweets();

    await this.validate(tweets);
    Logger.success('success - get-all-tweets - execute done.');

    return tweets;
  }
}

export default GetAllTweetsService;
