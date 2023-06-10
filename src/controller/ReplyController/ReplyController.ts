import { Request, Response } from 'express';

import logger from '../../lib/common/Logger';
import { ReplyPayload } from '../../repository/ReplyRepository/interface/ReplyRepositoryInterface';
import AddReplyService from '../../service/Reply/AddReply.service';
import { StatusCode } from '../../utils/StatusCodes';

export const addReply = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = parseInt(req?.user?.userId as string, 10);

  const body: Omit<ReplyPayload, 'userId'> = req.body;

  const replyPayload = {
    message: body.message,
    tweetId: body.tweetId,
    commentId: body.commentId,
    userId,
  };
  const reply = await new AddReplyService().execute(replyPayload);

  if (reply) {
    logger.info(`POST, status: ${StatusCode.Created}, endpoint: ${req.originalUrl}`);
  }

  res.status(StatusCode.Created).json(reply);
};
