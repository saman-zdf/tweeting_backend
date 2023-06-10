import { Request, Response } from 'express';

import logger from '../../lib/common/Logger';
import LikeCommentService from '../../service/Like/LikeComment.service';
import LikeCommentReplyService from '../../service/Like/LikeCommentReply.service';
import LikeTweetService from '../../service/Like/LikeTweet.service';
import { StatusCode } from '../../utils/StatusCodes';

export const likeTweet = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  const tweetId = req.query.tweetId as string;
  const likePayload = {
    userId: parseInt(userId, 10),
    tweetId: parseInt(tweetId, 10),
  };
  const like = await new LikeTweetService().execute(likePayload);
  if (like) {
    logger.info(`PATCH, status: ${StatusCode.OK}, endpoint: ${req.originalUrl}`);
  }
  res.status(StatusCode.OK).json({ like });
};

export const likeComment = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  const commentId = req.query.commentId as string;
  const likePayload = {
    userId: parseInt(userId, 10),
    commentId: parseInt(commentId, 10),
  };
  const like = await new LikeCommentService().execute(likePayload);
  if (like) {
    logger.info(`PATCH, status: ${StatusCode.OK}, endpoint: ${req.originalUrl}`);
  }
  res.status(StatusCode.OK).json({ like });
};

export const likeCommentReply = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  const replyId = req.query.replyId as string;
  const likeReplyPayload = {
    userId: parseInt(userId, 10),
    replyId: parseInt(replyId, 10),
  };

  const likeReply = await new LikeCommentReplyService().execute(likeReplyPayload);

  if (!likeReply) {
    logger.info(`PATCH, status: ${StatusCode.Created}, endpoint: ${req.originalUrl}`);
  }

  res.status(StatusCode.Created).json({ likeReply });
};
