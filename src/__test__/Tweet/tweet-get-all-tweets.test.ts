import { PrismaClient } from '@prisma/client';
import supertest, { SuperTest, Test } from 'supertest';

import { app } from '../../app';
import prisma from '../../lib/prisma';

describe('GET return all tweets', () => {
  const request: SuperTest<Test> = supertest(app);
  const validFakeToken = process.env.USER_TOKEN;
  let prismaDB: PrismaClient;
  const tweets = [
    { content: 'Hello world! .@-test-tweet' },
    { content: 'Having a great day! .@-test-tweet' },
    { content: 'Just finished an amazing book. .@-test-tweet' },
    { content: 'Feeling grateful today. .@-test-tweet' },
    { content: 'Excited for the weekend! .@-test-tweet' },
    { content: 'Life is beautiful. .@-test-tweet' },
    { content: 'Feeling grateful today. .@-test-tweet' },
    { content: 'Excited for the weekend! .@-test-tweet' },
    { content: 'Life is beautiful. .@-test-tweet' },
    { content: 'Feeling grateful today. .@-test-tweet' },
    { content: 'Excited for the weekend! .@-test-tweet' },
    { content: 'Life is beautiful. .@-test-tweet' },
  ];

  beforeAll(() => {
    prismaDB = prisma;
  });

  beforeAll(async () => {
    tweets.forEach(async (tweet) => {
      await request.post('/tweet').set('Authorization', `Bearer ${validFakeToken!}`).send(tweet);
    });
  });

  afterAll(async () => {
    await prismaDB.$disconnect();
  });

  test.only('Get all tweets and it should return 0 tweets', async () => {
    await request
      .post('/tweet')
      .set('Authorization', `Bearer ${validFakeToken!}`)
      .send({ content: 'Life is beautiful. .@-test-tweet' });
    const tweets = await prismaDB.tweet.findMany();
    expect(tweets.length).not.toBe(0);
    await prismaDB.tweet.deleteMany({ where: { content: { contains: '. .@-test-tweet' } } });
  });
});
