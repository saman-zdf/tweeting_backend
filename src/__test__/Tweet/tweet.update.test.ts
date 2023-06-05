import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';
import supertest, { SuperTest, Test } from 'supertest';
import { app } from '../../app';
import { parseJson } from '../../lib/errorHelpers';

describe('PATCH update tweet', () => {
  const request: SuperTest<Test> = supertest(app);
  let prismaDB: PrismaClient;
  const validFakeToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjY5LCJ1c2VybmFtZSI6bnVsbCwiZW1haWwiOiJtYXlAdGVzdC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRjamhLWXoya0FRVG5XNEkzcEY1cDRldVFCS2RWNHhJdXFJcVNPbEZtZ0N3bndEeEJaUy92UyIsInJvbGUiOiJVU0VSIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0wM1QxNDoxNjowNC45ODNaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0wM1QxNDoxNjowNC45ODNaIiwiaWF0IjoxNjg1ODAxNzY0LCJleHAiOjE3NzIyMDE3NjR9.pLGa30dcvNqtY48dqcqEqaxpdbuQJmjfwNCQyHK8zfE';
  const unauthenticatedTokenFoUpdate =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcwLCJ1c2VybmFtZSI6bnVsbCwiZW1haWwiOiJuaW5hQHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkRUNzcDB4ZHlKaDRLLndCNDZhVUhndXl1Z0ZGWC5kZHVjdnV5TG13Vk8zWFBZQjY1MVNJalciLCJyb2xlIjoiVVNFUiIsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMDNUMTQ6MTY6MjUuNzI2WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDYtMDNUMTQ6MTY6MjUuNzI2WiIsImlhdCI6MTY4NTgwMTc4NSwiZXhwIjoxNzcyMjAxNzg1fQ.A7r_RYqnnXhblJQRvXb1Q3EdcqiEgATk7RansB08uYM';

  beforeAll(() => {
    prismaDB = prisma;
  });

  const updateTweet = async (payload: object, id: number, token: string) => {
    return await request.patch(`/tweet/${id}`).set('Authorization', `Bearer ${token}`).send(payload);
  };

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

  test('Update tweet without authorization to return unauthorized error.', async () => {
    const res = await request.patch('/tweet/1').set('Authorization', ``).send();
    const data = parseJson(res.text);
    expect(data.error).toBe('Unauthorized');
  });

  test('Update tweet with missing token to return unauthorized error.', async () => {
    const res = await request.patch('/tweet/1').set('Authorization', `Bearer`).send();
    const data = parseJson(res.text);
    expect(data.error).toBe('Unauthorized');
  });

  test('Update tweet without payload should return Zod error for missing payload', async () => {
    const payload = { content: 'This is a test tweet that needs to be updated.@-test-tweet' };
    const tweet = await createTweet(payload);
    const res = await updateTweet({}, tweet.body.tweet.id, validFakeToken);

    expect(res.body.issues).toEqual([
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['content'],
        message: 'Tweet cannot be posted empty.',
      },
    ]);
  });

  test('Update tweet with unauthenticated token, to return forbidden with 403 error.', async () => {
    const payload = { content: 'This is a test tweet that needs to be updated.@-test-tweet' };
    const tweet = await createTweet(payload);
    const res = await updateTweet(
      { content: 'This is has been updated now.@-test-tweet' },
      tweet.body.tweet.id,
      unauthenticatedTokenFoUpdate,
    );
    const { error } = parseJson(res.text);

    expect(res.status).toBe(403);
    expect(error).toBe('Unauthenticated, forbidden.');
  });

  test('Update tweet with incorrect tweet id, to return not found error', async () => {
    const res = await updateTweet(
      { content: 'This is has been updated now.@-test-tweet' },
      12,
      unauthenticatedTokenFoUpdate,
    );
    const { error } = parseJson(res.text);
    expect(res.status).toBe(404);
    expect(error).toBe('Tweet with tweetId 12 not found.');
  });

  test('Update tweet successfully', async () => {
    const payload = { content: 'This is a test tweet that needs to be updated.@-test-tweet' };
    const tweet = await createTweet(payload);
    const res = await updateTweet(
      { content: 'This is has been updated now.@-test-tweet' },
      tweet.body.tweet.id,
      validFakeToken,
    );

    const data = parseJson(res.text);

    expect(res.status).toBe(200);
    expect(data.tweet.content).toBe('This is has been updated now.@-test-tweet');
  });
});
