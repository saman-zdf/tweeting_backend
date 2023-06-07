import { BadRequestException, NotFoundException } from '../../error';
import logger from '../../lib/common/Logger';
import LikeRepository from '../../repository/LikeRepository/LikeRepository';
import { LikeTweetPayload } from '../../repository/LikeRepository/interface/LikeRepositoryInterface';
import TweetRepository from '../../repository/TweetRepository/TweetRepository';

class LikeTweetService {
  private tweetRepository: TweetRepository;
  private likeRepository: LikeRepository;

  constructor() {
    this.tweetRepository = new TweetRepository();
    this.likeRepository = new LikeRepository();
  }

  async validate(payload: LikeTweetPayload) {
    const { tweetId, userId } = payload;

    if (!tweetId || !userId) {
      logger.error('Error, , like-tweet-service - undefined tweetId | userId');
      throw new BadRequestException('TweetId and userId not provided.');
    }

    const tweet = await this.tweetRepository.getTweetById(tweetId);

    if (!tweet) {
      logger.error('Error, , like-tweet-service - tweet not found.');
      throw new NotFoundException(`Tweet with tweetId: ${tweetId} is not existed.`);
    }
  }

  async execute(payload: LikeTweetPayload) {
    await this.validate(payload);
    const like = await this.likeRepository.likeTweet(payload);
    logger.info('success - like-tweet-service  - execute done.');
    return like;
  }
}

export default LikeTweetService;
