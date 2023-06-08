import { Follow, PrismaClient } from '@prisma/client';

import logger from '../../lib/common/Logger';
import prisma from '../../lib/prisma';
import {
  FollowRepositoryInterface,
  FollowingUserPayload,
  UserFollowerPayload,
} from './interface/FollowRepositoryInterface';

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

  async userFollower(payload: UserFollowerPayload): Promise<Follow> {
    logger.info('follow-repository - user-follower');
    const { userId, followerUserId } = payload;
    const userFollowed = await this.prismaDB.follow.create({
      data: {
        userId,
        followerUserId,
      },
    });

    return userFollowed;
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
