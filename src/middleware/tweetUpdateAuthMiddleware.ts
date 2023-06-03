import { Response, NextFunction, Request } from 'express';
import { tokenDecoderAndInfoExtractor } from '../lib/extractToken.js';
import logger from '../lib/common/Logger.js';
import { StatusCode } from '../utils/StatusCodes.js';
import UnauthenticatedException from '../error/unauthenticatedException.js';
import prisma from '../lib/prisma.js';
import NotFoundException from '../error/NotFoundException.js';

export const tweetUpdateAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tweetId, userId } = tokenDecoderAndInfoExtractor(req);
    // CRUCIAL:
    // TODO: replace with getTweetById service
    const tweetToUpdate = await prisma.tweet.findFirst({
      where: {
        id: tweetId,
      },
    });

    if (!tweetToUpdate) {
      throw new NotFoundException('');
    }

    if (tweetId && userId !== tweetToUpdate.userId) {
      logger.error('Error, user unauthenticated. ');
      throw new UnauthenticatedException('');
    }

    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage: { error: string; code: number } = {
      error: 'Unauthenticated, forbidden.',
      code: StatusCode.Unauthenticated,
    };

    if (error?.code === StatusCode.NotFound) {
      errorMessage.error = `Tweet with tweetId ${req.params.tweetId} not found.`;
      errorMessage.code = StatusCode.NotFound;
    }

    res.status(errorMessage.code).json({ error: errorMessage.error });
  }
};
