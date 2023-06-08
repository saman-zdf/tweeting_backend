import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import supertest, { SuperTest, Test } from 'supertest';

import { app } from '../../app';
import { parseJson } from '../../lib/errorHelpers';
import prisma from '../../lib/prisma';

dotenv.config();

describe('PATCH like tweet', () => {
  const request: SuperTest<Test> = supertest(app);
  let prismaDB: PrismaClient;
  const validFakeToken = process.env.USER_TOKEN;

  beforeAll(() => {
    prismaDB = prisma;
  });

  const failLikeTweet = async (payload: object) => {
    return await request.patch('/like-tweet').set('Authorization', `Bearer ${validFakeToken}`).send(payload);
  };

  const successLikeTweet = async (tweetId: number, userId: number) => {
    return await request
      .patch(`/like-tweet?tweetId=${tweetId}&userId=${userId}`)
      .set('Authorization', `Bearer ${validFakeToken}`);
  };

  const createTweet = async (payload: object) => {
    return await request.post('/tweet').set('Authorization', `Bearer ${validFakeToken}`).send(payload);
  };

  afterAll(async () => {
    const tweet = await prismaDB.tweet.deleteMany({
      where: {
        content: {
          contains: '.@-test-tweet',
        },
      },
    });
    const like = await prismaDB.like.deleteMany({
      where: {
        tweet: {
          content: {
            contains: '.@-test-tweet',
          },
        },
      },
    });
    Promise.all([tweet, like]);
  });

  afterAll(async () => {
    await prismaDB.$disconnect();
  });

  test('Should return unauthorized if there is no headers in like route', async () => {
    const res = await request.post('/tweet').set('Authorization', ``).send();
    const data = parseJson(res.text);
    expect(data.error).toBe('Unauthorized');
  });

  test('Should return an error if tweetId or userId is not provided.', async () => {
    const payload = {};
    const res = await failLikeTweet(payload);
    const data = parseJson(res.text);
    expect(data.msg).toEqual('TweetId and userId not provided.');
  });

  test('Should successfully like tweet.', async () => {
    const payload = { content: 'This is a test tweet that needs to be liked.@-test-tweet' };
    const tweet = await createTweet(payload);
    const { id, userId } = tweet.body.tweet;

    const likedTweet = await successLikeTweet(id, userId);
    expect(likedTweet.body.like).not.toBeNull();
    expect(tweet.status).toBe(201);
    expect(likedTweet.body.like.tweetId).toBe(id);
    expect(likedTweet.body.like.userId).toBe(userId);
  });
});
