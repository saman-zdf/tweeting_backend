import { PrismaClient } from '@prisma/client';
import prisma from '../../config/db';
import supertest, { SuperTest, Test } from 'supertest';
import { app } from '../../app';
import { parseJson } from '../../lib/errorHelprs';

describe('POST create tweet', () => {
  const request: SuperTest<Test> = supertest(app);
  let prismaDB: PrismaClient;
  const validFakeToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODMsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6InNhbUB0ZXN0LnRlc3RpbmcuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkTnptLm90T1hZUWZWbWY0bTlIdnFxLkd3cmhBZ1p3TWFGbnJRelE0eS5hY0VBMjloVExVNEMiLCJyb2xlIjoiVVNFUiIsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMDJUMDg6MDU6MzQuMzU2WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDYtMDJUMDg6MDU6MzQuMzU2WiIsImlhdCI6MTY4NTY5NjAxNiwiZXhwIjoxNzcyMDk2MDE2fQ.h0-JgZ-iqosIafqFY3E61k-9i4tKTnvpCHgCiA_qbvY';

  beforeAll(() => {
    prismaDB = prisma;
  });

  const createTweet = async (payload: object) => {
    return await request.post('/tweet').set('Authorization', `Bearer ${validFakeToken}`).send(payload);
  };

  afterEach(async () => {
    await prisma.tweet.deleteMany({
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
    expect(tweet.userId).toEqual(83);
    expect(tweet).toHaveProperty('id');
  });
});
