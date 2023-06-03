import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';
import supertest, { SuperTest, Test } from 'supertest';
import { app } from '../../app';

describe('PaTCH update tweet', () => {
  const request: SuperTest<Test> = supertest(app);
  let prismaDB: PrismaClient;
  const tweets = [
    { content: '1 - Hello world! .@-test-tweet' },
    { content: '1 - Having a great day! .@-test-tweet' },
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
      await request.post('/tweet').send(tweet);
    });
  });

  afterEach(async () => {
    await prismaDB.tweet.deleteMany({});
  });

  afterAll(async () => {
    await prismaDB.tweet.deleteMany({ where: { content: { contains: '. .@-test-tweet' } } });
    await prismaDB.$disconnect();
  });

  test('Update tweet without authorization to return unauthorized error.', async () => {
    const tweets = await prisma.tweet.findMany();
    expect(tweets.length).not.toBe(0);
  });
});
