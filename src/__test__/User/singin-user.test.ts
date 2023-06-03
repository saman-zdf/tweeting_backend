import { app } from '../../app';
import supertest, { SuperTest, Test } from 'supertest';
import { parseJson } from '../../lib/errorHelpers';
import prisma from '../../lib/prisma';
import { PrismaClient } from '@prisma/client';

describe('POST User sign-in', () => {
  const request: SuperTest<Test> = supertest(app);
  let prismaDB: PrismaClient;

  const signUpUser = async (payload: object) => {
    return await request.post('/user/sign-up').send(payload);
  };

  const signInUser = async (payload: object) => {
    return await request.post('/user/sign-in').send(payload);
  };

  beforeAll(() => {
    prismaDB = prisma;
  });

  afterEach(async () => {
    await prismaDB.user.deleteMany({
      where: {
        email: {
          contains: '.test.com',
        },
      },
    });
  });

  afterAll(async () => {
    await prismaDB.$disconnect();
  });

  test('Should return error with no payload', async () => {
    const payload = {};
    const res = await signInUser(payload);
    const data = parseJson(res.text)?.issues;

    expect(data).toEqual([
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['email'],
        message: 'Email is required.',
      },
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['password'],
        message: 'Password is required',
      },
    ]);
  });

  test('Should return error with no wrong email', async () => {
    const payload = { email: 'thisNotExist@email.test.com', password: 'secret' };
    const res = await signInUser(payload);
    const data = parseJson(res.text);

    expect(data.msg).toBe(
      'Wrong email, email thisNotExist@email.test.com does not exist, please try again or create an account.',
    );
  });

  test('Should return error with wrong email', async () => {
    const payload = { email: 'thisNotExist@email.test.com', password: 'secret' };
    const res = await signInUser(payload);
    const data = parseJson(res.text);

    expect(data.msg).toBe(
      'Wrong email, email thisNotExist@email.test.com does not exist, please try again or create an account.',
    );
  });

  /*
  TODO: These tests are failing because I'm using the same db as my development |  production. I need to find a way to create a separate test DB
  */

  test('Should return error with no wrong password', async () => {
    const payload = { email: 'sam@test.testing.prisma.com', password: 'secret-testing' };
    const res = await signInUser(payload);
    const data = parseJson(res.text);
    expect(data.msg).toBe('Wrong password. Please try again.');
  });

  test('Should successfully sign-in user', async () => {
    const payload = { email: 'sam@test.testing.prisma.com', password: 'testing' };
    await signUpUser(payload);
    const {
      body: { user },
    } = await signInUser(payload);

    expect(user).toHaveProperty('token');
    expect(user.email).toBe('sam@test.testing.prisma.com');
    expect(user.role).toBe('USER');
    expect(user).not.toHaveProperty('password');
  });
});
