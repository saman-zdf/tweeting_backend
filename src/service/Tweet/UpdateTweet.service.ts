import NotFoundException from '../../error/NotFoundException.js';
import BadRequestException from '../../error/BadRequestException.js';
import logger from '../../lib/common/Logger.js';
import TweetRepository from '../../repository/TweetRepository/TweetRepository.js';
import { TweetUpdatePayload } from '../../repository/TweetRepository/interface/TweetRepositoryInterface.js';
import { calculateUpdateExpirationMinutes } from '../../lib/common/updateExpirationMinutes.js';

class UpdateTweetService {
  private tweetRepository: TweetRepository;
  private updateExpirationMinutes: number;

  constructor() {
    this.tweetRepository = new TweetRepository();
    this.updateExpirationMinutes = 15;
  }

  async validate(payload: TweetUpdatePayload) {
    const { tweetId } = payload;
    const tweetToUpdate = await this.tweetRepository.getTweetById(tweetId, { likes: true, comments: true });

    if (!tweetToUpdate) {
      logger.error(`Error, tweetId: ${tweetId} - not-found.`);
      throw new NotFoundException(`Tweet with with tweetId ${tweetId} not found.`);
    }

    const { createdAt } = tweetToUpdate;
    const isUpdateDurationExpired = calculateUpdateExpirationMinutes(createdAt, this.updateExpirationMinutes);

    if (isUpdateDurationExpired) {
      logger.error('Error, update-time expired');
      throw new BadRequestException(
        'Update time has expired. You can only update posted content within 15 minutes of posting.',
      );
    }

    return tweetToUpdate;
  }

  async execute(payload: TweetUpdatePayload) {
    await this.validate(payload);

    const updatedTweet = await this.tweetRepository.updateTweet(payload, { likes: true, comments: true });

    logger.info(`tweet-service - success tweet-update for tweetId: ${updatedTweet.id} - execute done.`);
    return updatedTweet;
  }
}

export default UpdateTweetService;
