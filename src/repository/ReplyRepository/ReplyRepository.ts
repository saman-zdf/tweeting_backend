import { PrismaClient, Reply } from '@prisma/client';

import logger from '../../lib/common/Logger';
import prisma from '../../lib/prisma';
import { ReplyPayload, ReplyRepositoryInterface } from './interface/ReplyRepositoryInterface';

class ReplyRepository implements ReplyRepositoryInterface {
  private prismaDB: PrismaClient;

  constructor() {
    this.prismaDB = prisma;
  }

  async addReply(payload: ReplyPayload): Promise<Reply> {
    const { tweetId, commentId, message, userId } = payload;
    logger.info('reply-repository add-reply');
    const reply = await this.prismaDB.reply.create({
      data: {
        tweetId,
        userId,
        commentId,
        message,
      },
    });

    return reply;
  }

  async getAllReplies(): Promise<Reply[]> {
    logger.info('reply-repository get-all-replies');
    const allReplies = await this.prismaDB.reply.findMany();
    return allReplies;
  }

  async getReplyById(replyId: number): Promise<Reply | null> {
    logger.info('reply-repository get-reply-by-id');
    const reply = await this.prismaDB.reply.findFirst({
      where: {
        id: replyId,
      },
    });
    return reply;
  }
}

export default ReplyRepository;
