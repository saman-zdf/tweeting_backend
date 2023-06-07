import { PrismaClient } from '@prisma/client';
import supertest, { SuperTest, Test } from 'supertest';

import { app } from '../../app';
import { parseJson } from '../../lib/errorHelpers';
import prisma from '../../lib/prisma';

describe('User API - [POST] /user/sign-up', () => {
  const request: SuperTest<Test> = supertest(app);

  let prismaDB: PrismaClient;

  const signUpUser = async (payload: object) => {
    return await request.post('/user/sign-up').send(payload);
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

  describe('Test User Sign Up', () => {
    test('Test should return error for missing Email and Password', async () => {
      const payload = {};
      const res = await signUpUser(payload);
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

    test('Test should return error for invalid email.', async () => {
      const payload = { email: 'invalidEmail', password: 'secret' };
      const res = await signUpUser(payload);
      const data = parseJson(res.text)?.issues;

      expect(data).toEqual([
        {
          code: 'invalid_string',
          path: ['email'],
          message: 'Invalid email, please provide a valid email.',
          validation: 'email',
        },
      ]);
    });

    test('Test should return error for not meeting the minimum characters', async () => {
      const payload = { email: 'sam@email.test.com', password: '1' };
      const res = await signUpUser(payload);
      const data = parseJson(res.text)?.issues;

      expect(data).toEqual([
        {
          path: ['password'],
          code: 'too_small',
          exact: false,
          inclusive: true,
          message: 'Password must be minimum of 5 characters.',
          minimum: 5,
          type: 'string',
        },
      ]);
    });

    test('Test should return error for exceeding minimum characters.', async () => {
      const payload = {
        email: 'sam@email.test.com',
        password: 'asdbnmajklsfakldsafndfkaakldfalkffdaklfhadlkfakldjfhadklhfakdfhlkfhdklfhdlfndfkahdflkahdfl',
      };
      const res = await signUpUser(payload);
      const data = parseJson(res.text)?.issues;

      expect(data).toEqual([
        {
          path: ['password'],
          code: 'too_big',
          exact: false,
          inclusive: true,
          message: 'Password cannot exceed 30 characters.',
          maximum: 30,
          type: 'string',
        },
      ]);
    });

    test('Test successful user sign-up', async () => {
      const payload = { email: 'sam@test.test.com', password: 'testing' };
      const {
        body: { user },
      } = await signUpUser(payload);

      expect(user).toHaveProperty('token');
      expect(user.email).toBe('sam@test.test.com');
      expect(user.role).toBe('USER');
      expect(user).not.toHaveProperty('password');
    });
  });
});
