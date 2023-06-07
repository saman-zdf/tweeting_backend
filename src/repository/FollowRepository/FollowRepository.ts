import { Follow, PrismaClient } from '@prisma/client';

import prisma from '../../lib/prisma';
import { FollowRepositoryInterface, FollowUserPayload, UserFollowPayload } from './interface/FollowRepositoryInterface';

class FollowRepository implements FollowRepositoryInterface {
  private prismaDB: PrismaClient;

  constructor() {
    this.prismaDB = prisma;
  }

  async followUser(payload: FollowUserPayload): Promise<Follow> {
    const { userId, followingUserId } = payload;
    const followingUser = await this.prismaDB.follow.create({
      data: {
        userId,
        followingUserId,
      },
    });

    return followingUser;
  }

  async userFollower(payload: UserFollowPayload): Promise<Follow> {
    const { userId, followerUserId } = payload;
    const userFollowed = await this.prismaDB.follow.create({
      data: {
        userId,
        followerUserId,
      },
    });

    return userFollowed;
  }
}

export default FollowRepository;
