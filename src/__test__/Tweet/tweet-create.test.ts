import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import supertest, { SuperTest, Test } from 'supertest';

import { app } from '../../app';
import { parseJson } from '../../lib/errorHelpers';
import prisma from '../../lib/prisma';

dotenv.config();

describe('POST create tweet', () => {
  const request: SuperTest<Test> = supertest(app);
  let prismaDB: PrismaClient;
  const validFakeToken = process.env.USER_TOKEN;

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
    expect(tweet).toHaveProperty('id');
  });
});
