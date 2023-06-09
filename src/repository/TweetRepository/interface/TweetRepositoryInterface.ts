import { Prisma, Tweet } from '@prisma/client';

export interface TweetPayload {
  userId: number;
  content: string;
  imageUrl?: string;
  gifUrl?: string;
}

export interface TweetUpdatePayload extends TweetPayload {
  tweetId: number;
}

export interface TweetRepositoryInterface {
  createTweet(payload: TweetPayload): Promise<Tweet>;
  updateTweet(payload: TweetUpdatePayload, include: Prisma.TweetInclude): Promise<Tweet>;
  getAllTweets(): Promise<Tweet[]>;
  getTweetById(tweetId: number, include: Prisma.TweetInclude): Promise<Tweet>;
  getUserTweets(userId: number): Promise<Tweet[]>;
  getUserLatestTweet(userIds: number[]): Promise<Tweet[]>;
}
