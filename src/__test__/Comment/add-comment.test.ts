import { PrismaClient } from '@prisma/client';
import supertest, { SuperTest, Test } from 'supertest';

import { app } from '../../app';
import { parseJson } from '../../lib/errorHelpers';
import prisma from '../../lib/prisma';

describe('PATCH comment tweet', () => {
  const request: SuperTest<Test> = supertest(app);
  let prismaDB: PrismaClient;
  const validFakeToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOm51bGwsImVtYWlsIjoic2FtQHRlc3QudGVzdGluZy5wcmlzbWEuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkd3VZN1RTam9sNW03bWkwbk8uU2lNdUhwZ1ZNOEk4NVpOV2N2eVl0SzlwUElVOEt4UUgwemUiLCJyb2xlIjoiVVNFUiIsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMDdUMTA6NDA6NTcuMDI0WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDYtMDdUMTA6NDA6NTcuMDI0WiIsImlhdCI6MTY4NjEzNDcyMCwiZXhwIjoxNzcyNTM0NzIwfQ.lmOIpR4bWhR9NniqZLrw4kZcLO0axEgjXBCHvgzZY5s';

  beforeAll(() => {
    prismaDB = prisma;
  });

  const createTweet = async (payload: object) => {
    return await request.post('/tweet').set('Authorization', `Bearer ${validFakeToken}`).send(payload);
  };

  const addCommentToTweet = async (payload: object) => {
    return await request.post('/tweet/comment').set('Authorization', `Bearer ${validFakeToken}`).send(payload);
  };

  afterAll(async () => {
    const tweets = await prismaDB.tweet.deleteMany({
      where: {
        content: {
          contains: '.@-test-tweet',
        },
      },
    });
    const comments = await prismaDB.comment.deleteMany({
      where: {
        tweet: {
          content: {
            contains: '.@-test-tweet',
          },
        },
      },
    });
    Promise.all([tweets, comments]);
  });

  afterAll(async () => {
    await prismaDB.$disconnect();
  });

  test('Should return unauthorized if there is no headers in comment route', async () => {
    const res = await request.post('/tweet/comment').set('Authorization', ``).send();
    const data = parseJson(res.text);
    expect(data.error).toBe('Unauthorized');
  });

  test('Should return an error if payload is not provided.', async () => {
    const payload = {};
    const res = await addCommentToTweet(payload);
    const data = parseJson(res.text)?.issues;
    expect(res.status).toBe(400);
    expect(data).toEqual([
      {
        code: 'invalid_type',
        expected: 'number',
        received: 'undefined',
        path: ['tweetId'],
        message: 'Tweet ID is required.',
      },
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['content'],
        message: 'Content is required.',
      },
    ]);
  });

  test('Should return an error if tweet is not existed', async () => {
    const payload = { userId: 1, tweetId: 200, content: 'This is the test comment.' };
    const res = await addCommentToTweet(payload);
    const data = parseJson(res.text);
    expect(data.msg).toEqual('Tweet with id 200 is not found.');
    expect(res.status).toEqual(404);
  });

  test('Should return an error if comment is less than 5 characters.', async () => {
    const tweetPayload = { content: 'This is a test tweet that needs to be commented.@-test-tweet.' };
    const tweet = await createTweet(tweetPayload);
    const { id, userId } = tweet.body.tweet;
    const commentPayload = {
      userId,
      tweetId: id,
      content: 'ok',
    };

    const res = await addCommentToTweet(commentPayload);
    const issues = parseJson(res.text)?.issues;
    expect(res.status).toBe(400);
    expect(issues).toEqual([
      {
        code: 'too_small',
        minimum: 5,
        type: 'string',
        inclusive: true,
        exact: false,
        message: 'Please provide minimum of 5 characters.',
        path: ['content'],
      },
    ]);
  });

  test('Should successfully add comment for created tweet.', async () => {
    const tweetPayload = { content: 'This is a test tweet that needs to be commented.@-test-tweet.' };
    const tweet = await createTweet(tweetPayload);
    const { id, userId } = tweet.body.tweet;
    const commentPayload = {
      userId,
      tweetId: id,
      content: 'This is a test comment on the tweet.@-test-tweet.',
    };

    const res = await addCommentToTweet(commentPayload);
    const data = parseJson(res.text);
    expect(res.status).toBe(201);
    expect(data.userId).toBe(userId);
    expect(data.tweetId).toBe(id);
  });

  // test('Should successfully like tweet.', async () => {
  //   const payload = { content: 'This is a test tweet that needs to be updated.@-test-tweet' };
  //   const tweet = await createTweet(payload);
  //   const { id, userId } = tweet.body.tweet;

  //   const likedTweet = await successLikeTweet(id, userId);
  //   expect(likedTweet.body.like).not.toBeNull();
  //   expect(likedTweet.body.like.tweetId).toBe(id);
  //   expect(likedTweet.body.like.userId).toBe(userId);
  // });
});
