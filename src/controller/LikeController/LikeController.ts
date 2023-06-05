import LikeService from '../../service/Like/Like.service';
import logger from '../../lib/common/Logger';
import { StatusCode } from '../../utils/StatusCodes';
import { Response, Request } from 'express';

export const addLike = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  const tweetId = req.query.tweetId as string;
  const likePayload = {
    userId: parseInt(userId, 10),
    tweetId: parseInt(tweetId, 10),
  };

  const like = await new LikeService().execute(likePayload);

  if (like) {
    logger.info(`PATCH, status: ${StatusCode.OK}, endpoint: ${req.originalUrl}`);
  }

  res.status(StatusCode.OK).json({ like });
};
