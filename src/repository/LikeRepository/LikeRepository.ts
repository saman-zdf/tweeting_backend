import { Like, PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';
import { LikePayload, LikeRepositoryInterface } from './interface/LikeRepositoryInterface';
import logger from '../../lib/common/Logger';

class LikeRepository implements LikeRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async addLike(payload: LikePayload): Promise<Like | null> {
    logger.info('like-repository - add-like');
    const { tweetId, userId } = payload;
    const isTweetLiked = await this.getTweetLikeByUser(payload);

    if (isTweetLiked) {
      await this.prisma.like.update({
        where: {
          id: isTweetLiked.id,
        },
        data: {
          deletedAt: !isTweetLiked.deletedAt,
        },
      });

      return isTweetLiked;
    }

    const liked = await this.prisma.like.create({
      data: {
        tweetId,
        userId,
      },
    });

    return liked!;
  }

  async getTweetLikeByUser(payload: LikePayload): Promise<Like | null> {
    const { tweetId, userId } = payload;
    const tweetLikedByUser = await this.prisma.like.findFirst({
      where: {
        userId,
        tweetId,
      },
    });

    return tweetLikedByUser;
  }
}

export default LikeRepository;
