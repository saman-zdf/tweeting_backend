import { Prisma, PrismaClient, Tweet } from '@prisma/client';
import prisma from '../../config/db.js';
import { TweetPayload, TweetRepositoryInterface, TweetUpdatePayload } from './interface/TweetRepositoryInterface.js';
import { Logger } from '../../lib/common/Logger.js';

class TweetRepository implements TweetRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async createTweet(payload: TweetPayload): Promise<Tweet> {
    // TODO: How upload files? S3 || Cloudinary
    Logger.log('tweet-repository - create-tweet');
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
    Logger.log('tweet-repository - update-tweet');
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

  async getAllTweets(include: Prisma.TweetInclude): Promise<Tweet[]> {
    Logger.log('tweet-repository - get-all-tweets');
    const tweets = await this.prisma.tweet.findMany({
      include,
    });

    return tweets;
  }

  async getTweetById(tweetId: number, include: Prisma.TweetInclude): Promise<Tweet> {
    Logger.log('tweet-repository - get-tweet-by-id');
    const tweet = await this.prisma.tweet.findFirst({
      where: {
        id: tweetId,
      },
      include,
    });

    return tweet;
  }

  async getUserTweets(userId: number, include: Prisma.TweetInclude): Promise<Tweet[]> {
    Logger.log('tweet-repository - get-users-tweets');
    const usersTweets = await this.prisma.tweet.findMany({
      where: {
        userId,
      },
      include,
    });

    return usersTweets;
  }
}

export default TweetRepository;
