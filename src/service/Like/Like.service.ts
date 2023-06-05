import { LikePayload } from './../../repository/LikeRepository/interface/LikeRepositoryInterface';
import TweetRepository from '../../repository/TweetRepository/TweetRepository';
import LikeRepository from '../../repository/LikeRepository/LikeRepository';
import { BadRequestException, NotFoundException } from '../../error';
import logger from '../../lib/common/Logger';

class LikeService {
  private tweetRepository: TweetRepository;
  private likeRepository: LikeRepository;

  constructor() {
    this.tweetRepository = new TweetRepository();
    this.likeRepository = new LikeRepository();
  }

  async validate(payload: LikePayload) {
    const { tweetId, userId } = payload;

    if (!tweetId || !userId) {
      logger.error('Error, , like-service - undefined tweetId | userId');
      throw new BadRequestException('TweetId and userId not provided.');
    }

    const tweet = await this.tweetRepository.getTweetById(tweetId);

    if (!tweet) {
      logger.error('Error, , like-service - tweet not found.');
      throw new NotFoundException(`Tweet with tweetId: ${tweetId} is not existed.`);
    }
  }

  async execute(payload: LikePayload) {
    await this.validate(payload);
    const like = await this.likeRepository.addLike(payload);
    logger.info('success - add-like - execute done.');
    return like;
  }
}

export default LikeService;
