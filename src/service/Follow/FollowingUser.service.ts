import { BadRequestException, NotFoundException } from '../../error';
import logger from '../../lib/common/Logger';
import FollowRepository from '../../repository/FollowRepository/FollowRepository';
import { FollowingUserPayload } from '../../repository/FollowRepository/interface/FollowRepositoryInterface';
import UserRepository from '../../repository/UserRepository/UserRepository';

class FollowingUserService {
  private followRepository: FollowRepository;
  private userRepository: UserRepository;

  constructor() {
    this.followRepository = new FollowRepository();
    this.userRepository = new UserRepository();
  }

  async validate(payload: FollowingUserPayload) {
    const { followingUserId } = payload;

    const isUserFollowed = await this.followRepository.getUserFollowed(followingUserId);

    if (!isUserFollowed) {
      logger.error(`Error, user not found. ID: ${followingUserId}`);
      throw new NotFoundException(`User to follow with id ${followingUserId} not found.`);
    }

    if (isUserFollowed) {
      logger.error('Error, user already followed.');
      throw new BadRequestException(`User with id ${followingUserId} is been followed.`);
    }
  }

  async execute(payload: FollowingUserPayload) {
    const t = await this.validate(payload);
    logger.info(`VALIDATE: ${t}`);
    await this.validate(payload);
    const followUser = await this.followRepository.followingUser(payload);

    logger.info('success - follow-service - execute done.');

    return followUser;
  }
}

export default FollowingUserService;
