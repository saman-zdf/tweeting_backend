import { Response, NextFunction } from 'express';
import { tokenDecoderAndInfoExtractor } from '../lib/extractToken.js';
import { Logger } from '../lib/common/Logger.js';
import { StatusCode } from '../utils/StatusCodes.js';
import UnauthenticatedException from '../error/unauthenticatedException.js';
import prisma from '../config/db.js';
import { AuthenticatedRequest } from '../utils/types/authTypes.js';
import NotFoundException from '../error/NotFoundException.js';

export const tweetUpdateAuthMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { tweetId, userId } = await tokenDecoderAndInfoExtractor(req);
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
      Logger.error('Error, user unauthenticated. ');
      throw new UnauthenticatedException('');
    }

    next();
  } catch (error) {
    const errorMessage: { error: string; code: number } = {
      error: 'Unauthenticated, forbidden.',
      code: StatusCode.Unauthenticated,
    };

    if (error.code === StatusCode.NotFound) {
      errorMessage.error = `Tweet with tweetId ${req.params.tweetId} not found.`;
      errorMessage.code = StatusCode.NotFound;
    }

    res.status(errorMessage.code).json({ error: errorMessage.error });
  }
};
