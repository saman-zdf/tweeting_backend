import { Request, Response } from 'express';

import logger from '../../lib/common/Logger';
import { extractToken } from '../../lib/extractToken';
import { verifyToken } from '../../lib/jwt';
import { CommentPayload } from '../../repository/CommentRepository/interface/CommentRepositoryInterface';
import AddCommentService from '../../service/Comment/addComment.service';
import RemoveCommentService from '../../service/Comment/removeComment.service';
import { StatusCode } from '../../utils/StatusCodes';

export const addComment = async (req: Request, res: Response) => {
  const body: Omit<CommentPayload, 'userId'> = req.body;
  const header = extractToken(req);
  const token = header?.split(' ')[1];
  const userId = verifyToken?.(token!)?.id;
  const payload = {
    userId: userId!,
    tweetId: body.tweetId,
    content: body.content,
  };

  const comment = await new AddCommentService().execute(payload);

  if (comment) {
    logger.info(`POST, status: ${StatusCode.OK}, endpoint: ${req.originalUrl}`);
  }

  res.status(StatusCode.Created).json(comment);
};

export const removeComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;

  await new RemoveCommentService().execute(parseInt(commentId, 10));

  logger.info(`DELETE, status: ${StatusCode.NoContent}, endpoint: ${req.originalUrl}`);

  res.status(StatusCode.NoContent).json('Comment deleted.');
};
