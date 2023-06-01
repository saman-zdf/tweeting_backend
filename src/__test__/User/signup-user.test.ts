import { app } from '../../app';
import supertest, { SuperTest, Test } from 'supertest';
import { parseJson } from '../../lib/errorHelprs';

describe('Test app', () => {
  const request: SuperTest<Test> = supertest(app);
  test('GET health check', async () => {
    const response = await request.get('/');
    expect(response.body.message).toBe('Hello Tweet');
  });
});

describe('User API - [POST] /user/sign-up', () => {
  const request: SuperTest<Test> = supertest(app);

  const singUpUser = async (payload: object) => {
    return await request.post('/user/sign-up').send(payload);
  };

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
});
