import { Like, PrismaClient } from '@prisma/client';

import logger from '../../lib/common/Logger';
import prisma from '../../lib/prisma';
import { LikeCommentPayload, LikeRepositoryInterface, LikeTweetPayload } from './interface/LikeRepositoryInterface';

class LikeRepository implements LikeRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async likeTweet(payload: LikeTweetPayload): Promise<Like | null> {
    logger.info('like-repository - like-tweet');
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

    const tweetLiked = await this.prisma.like.create({
      data: {
        tweetId,
        userId,
      },
    });

    return tweetLiked;
  }

  async likeComment(payload: LikeCommentPayload): Promise<Like | null> {
    logger.info('like-repository - like-comment');
    const { commentId, userId } = payload;
    const isCommentLiked = await this.getCommentLikeByUser(payload);

    if (isCommentLiked) {
      await this.prisma.like.update({
        where: {
          id: isCommentLiked.id,
        },
        data: {
          deletedAt: !isCommentLiked.deletedAt,
        },
      });

      return isCommentLiked;
    }

    const commentLiked = await this.prisma.like.create({
      data: {
        userId,
        commentId,
      },
    });

    return commentLiked;
  }

  async getTweetLikeByUser(payload: LikeTweetPayload): Promise<Like | null> {
    const { tweetId, userId } = payload;
    const tweetLikedByUser = await this.prisma.like.findFirst({
      where: {
        userId,
        tweetId,
      },
    });

    return tweetLikedByUser;
  }

  async getCommentLikeByUser(payload: LikeCommentPayload): Promise<Like | null> {
    const { commentId, userId } = payload;
    const commentLikedByUser = await this.prisma.like.findFirst({
      where: {
        userId,
        commentId,
      },
    });

    return commentLikedByUser;
  }
}

export default LikeRepository;
