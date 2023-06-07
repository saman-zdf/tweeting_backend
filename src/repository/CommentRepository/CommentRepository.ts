import { Comment, PrismaClient } from '@prisma/client';

import logger from '../../lib/common/Logger';
import prisma from '../../lib/prisma';
import { CommentPayload, CommentRepositoryInterface } from './interface/CommentRepositoryInterface';

class CommentRepository implements CommentRepositoryInterface {
  private prismaDB: PrismaClient;

  constructor() {
    this.prismaDB = prisma;
  }

  async addComment(payload: CommentPayload): Promise<Comment> {
    logger.info('comment-repository - add-comment');
    const { tweetId, userId, content } = payload;

    const comment = await this.prismaDB.comment.create({
      data: {
        userId,
        tweetId,
        content,
      },
    });

    return comment;
  }

  async removeComment(commentId: number): Promise<null> {
    logger.info('comment-repository - remove-comment');
    await this.prismaDB.comment.delete({
      where: {
        id: commentId,
      },
    });

    return null;
  }

  async getCommentById(commentId: number): Promise<Comment> {
    logger.info('comment-repository - get-comment-by-comment');
    const comment = await this.prismaDB.comment.findFirst({
      where: {
        id: commentId,
      },
    });

    return comment!;
  }
}

export default CommentRepository;
