import { app } from '../../app';
import supertest, { SuperTest, Test } from 'supertest';
import { parseJson } from '../../lib/errorHelprs';
import prisma from '../../config/db';
import { PrismaClient } from '@prisma/client';

describe('Test app', () => {
  const request: SuperTest<Test> = supertest(app);
  test('GET health check', async () => {
    const response = await request.get('/');
    expect(response.body.message).toBe('Hello Tweet');
  });
});

describe('User API - [POST] /user/sign-up', () => {
  const request: SuperTest<Test> = supertest(app);

  let prismaDB: PrismaClient;

  const singUpUser = async (payload: object) => {
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

  test('Test should return error for missing Email and Password', async () => {
    const payload = {};
    const res = await singUpUser(payload);
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
    const res = await singUpUser(payload);
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
    const res = await singUpUser(payload);
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
    const res = await singUpUser(payload);
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
    const payload = { email: 'sam@test.test.com', password: 'secrettest' };
    const {
      body: { user },
    } = await singUpUser(payload);

    expect(user).toHaveProperty('token');
    expect(user.email).toBe('sam@test.test.com');
    expect(user.role).toBe('USER');
    expect(user).not.toHaveProperty('password');
  });
});
