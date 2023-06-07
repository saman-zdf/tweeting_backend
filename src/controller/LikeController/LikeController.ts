import { Request, Response } from 'express';

import logger from '../../lib/common/Logger';
import LikeCommentService from '../../service/Like/LikeComment.service';
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
