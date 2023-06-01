import TweetRepository from '../../repository/TweetRepository/TweetRepository.js';
import { Logger } from '../../lib/common/Logger.js';
import BadRequestException from '../../error/BadRequestException.js';

class GetUserLatestTweetService {
  private tweetRepository: TweetRepository;

  constructor() {
    this.tweetRepository = new TweetRepository();
  }

  async validate(userIds: number[]) {
    if (!userIds.length) {
      Logger.error('Error, no user-ids');
      throw new BadRequestException('No user ids have been provided.');
    }
  }

  async execute(userIds: number[]) {
    await this.validate(userIds);
    const usersLatestTweet = await this.tweetRepository.getUserLatestTweet(userIds);
    Logger.success('success - get-user-latest-tweet - execute done.');
    return usersLatestTweet;
  }
}

export default GetUserLatestTweetService;
