import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';
import supertest, { SuperTest, Test } from 'supertest';
import { app } from '../../app';
import { parseJson } from '../../lib/errorHelpers';

describe('PATCH like tweet', () => {
  const request: SuperTest<Test> = supertest(app);
  let prismaDB: PrismaClient;
  const validFakeToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjY5LCJ1c2VybmFtZSI6bnVsbCwiZW1haWwiOiJtYXlAdGVzdC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRjamhLWXoya0FRVG5XNEkzcEY1cDRldVFCS2RWNHhJdXFJcVNPbEZtZ0N3bndEeEJaUy92UyIsInJvbGUiOiJVU0VSIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0wM1QxNDoxNjowNC45ODNaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0wM1QxNDoxNjowNC45ODNaIiwiaWF0IjoxNjg1ODAxNzY0LCJleHAiOjE3NzIyMDE3NjR9.pLGa30dcvNqtY48dqcqEqaxpdbuQJmjfwNCQyHK8zfE';

  beforeAll(() => {
    prismaDB = prisma;
  });

  const likeTweet = async (payload: object) => {
    return await request.patch('/like').set('Authorization', `Bearer ${validFakeToken}`).send(payload);
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
    const res = await likeTweet(payload);
    const data = parseJson(res.text);
    expect(data.msg).toEqual('TweetId and userId not provided.');
  });
});
