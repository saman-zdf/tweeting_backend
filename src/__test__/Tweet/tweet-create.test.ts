import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';
import supertest, { SuperTest, Test } from 'supertest';
import { app } from '../../app';
import { parseJson } from '../../lib/errorHelpers';

describe('POST create tweet', () => {
  const request: SuperTest<Test> = supertest(app);
  let prismaDB: PrismaClient;
  const validFakeToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjY5LCJ1c2VybmFtZSI6bnVsbCwiZW1haWwiOiJtYXlAdGVzdC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRjamhLWXoya0FRVG5XNEkzcEY1cDRldVFCS2RWNHhJdXFJcVNPbEZtZ0N3bndEeEJaUy92UyIsInJvbGUiOiJVU0VSIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0wM1QxNDoxNjowNC45ODNaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0wM1QxNDoxNjowNC45ODNaIiwiaWF0IjoxNjg1ODAxNzY0LCJleHAiOjE3NzIyMDE3NjR9.pLGa30dcvNqtY48dqcqEqaxpdbuQJmjfwNCQyHK8zfE';

  beforeAll(() => {
    prismaDB = prisma;
  });

  const createTweet = async (payload: object) => {
    return await request.post('/tweet').set('Authorization', `Bearer ${validFakeToken}`).send(payload);
  };

  afterEach(async () => {
    await prismaDB.tweet.deleteMany({
      where: {
        content: {
          contains: '.@-test-tweet',
        },
      },
    });
  });

  afterAll(async () => {
    await prismaDB.$disconnect();
  });

  test('Create tweet without authorization to return unauthorized error.', async () => {
    const res = await request.post('/tweet').set('Authorization', ``).send();
    const data = parseJson(res.text);
    expect(data.error).toBe('Unauthorized');
  });

  test('Create tweet without authorization to return unauthorized error.', async () => {
    const res = await request.post('/tweet').set('Authorization', `Bearer `).send();
    const data = parseJson(res.text);
    expect(data.error).toBe('Unauthorized');
  });

  test('Create tweet without payload', async () => {
    const payload = {};
    const res = await createTweet(payload);

    const data = parseJson(res.text)?.issues;

    expect(data).toEqual([
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['content'],
        message: 'Tweet cannot be posted empty.',
      },
    ]);
  });

  test('Create tweet where minimum character doesnt meet and return an error.', async () => {
    const payload = { content: 'Lala haha' };
    const res = await createTweet(payload);

    const data = parseJson(res.text)?.issues;

    expect(data).toEqual([
      {
        code: 'too_small',
        minimum: 10,
        exact: false,
        inclusive: true,
        message: 'Please provide a minimum of 10 characters.',
        type: 'string',
        path: ['content'],
      },
    ]);
  });
  test('Create successful tweet', async () => {
    const payload = { content: 'This is a test tweets and we adding this suffix for tests, .@-test-tweet' };
    const res = await createTweet(payload);
    const { tweet } = parseJson(res.text);

    expect(tweet.content).toEqual('This is a test tweets and we adding this suffix for tests, .@-test-tweet');
    expect(tweet.userId).toEqual(269);
    expect(tweet).toHaveProperty('id');
  });
});
