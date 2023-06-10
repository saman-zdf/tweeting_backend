import { Follow, PrismaClient } from '@prisma/client';

import logger from '../../lib/common/Logger';
import prisma from '../../lib/prisma';
import { FollowRepositoryInterface, FollowingUserPayload } from './interface/FollowRepositoryInterface';

class FollowRepository implements FollowRepositoryInterface {
  private prismaDB: PrismaClient;

  constructor() {
    this.prismaDB = prisma;
  }

  async followingUser(payload: FollowingUserPayload): Promise<Follow> {
    logger.info('follow-repository - follow-user');
    const { userId, followingUserId } = payload;
    const followingUser = await this.prismaDB.follow.create({
      data: {
        userId,
        followingUserId,
      },
    });

    return followingUser;
  }

  async getUserFollowed(followingUserId: number): Promise<Follow | null> {
    logger.info('follow-repository - get-user-followed');

    const userFollowed = await this.prismaDB.follow.findFirst({
      where: {
        followingUserId,
      },
    });

    return userFollowed;
  }
}

export default FollowRepository;
