import { Prisma, PrismaClient, Tweet } from '@prisma/client';
import prisma from '../../lib/prisma.js';
import { TweetPayload, TweetRepositoryInterface, TweetUpdatePayload } from './interface/TweetRepositoryInterface.js';
import logger from '../../lib/common/Logger.js';

class TweetRepository implements TweetRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async createTweet(payload: TweetPayload): Promise<Tweet> {
    // TODO: How upload files? S3 || Cloudinary
    logger.info('tweet-repository - create-tweet');
    const { userId, content, imageUrl, gifUrl } = payload;

    const createdTweeter = await this.prisma.tweet.create({
      data: {
        userId,
        content,
        imageUrl,
        gifUrl,
      },
    });

    return createdTweeter;
  }

  async updateTweet(payload: TweetUpdatePayload, include: Prisma.TweetInclude): Promise<Tweet> {
    logger.info('tweet-repository - update-tweet');
    const { tweetId, content, imageUrl, gifUrl } = payload;
    const tweet = await this.prisma.tweet.update({
      where: {
        id: tweetId,
      },
      data: {
        content,
        gifUrl,
        imageUrl,
      },

      include,
    });

    return tweet;
  }

  async getAllTweets(): Promise<Tweet[]> {
    logger.info('tweet-repository - get-all-tweets');
    const tweets = await this.prisma.tweet.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        likes: {
          orderBy: {
            createdAt: 'desc',
          },
          where: {
            deletedAt: false,
          },
        },
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return tweets;
  }

  async getTweetById(tweetId: number, include?: Prisma.TweetInclude): Promise<Tweet> {
    logger.info('tweet-repository - get-tweet-by-id');
    const tweet = await this.prisma.tweet.findFirst({
      where: {
        id: tweetId,
      },
      include,
    });

    // TODO: Double test this after big refactoring on ts-config!!!!
    return tweet!;
  }

  async getUserTweets(userId: number): Promise<Tweet[]> {
    logger.info('tweet-repository - get-users-tweets');
    const usersTweets = await this.prisma.tweet.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        userId,
      },
      include: {
        likes: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return usersTweets;
  }

  async getUserLatestTweet(userIds: number[]): Promise<Tweet[]> {
    logger.info('tweet-repository - get-users-latest-tweet');

    const userLatestTweets = await this.prisma.tweet.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      distinct: ['userId'],
      where: {
        userId: {
          in: userIds,
        },
      },
      include: {
        likes: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return userLatestTweets;
  }
}

export default TweetRepository;
