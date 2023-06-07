import supertest, { SuperTest, Test } from 'supertest';

import { app } from '../app';

describe('Test app', () => {
  const request: SuperTest<Test> = supertest(app);
  test('GET/ health check', async () => {
    const response = await request.get('/');
    expect(response.body.message).toBe('Hello Tweet');
  });
  test('GET/ Not Found', async () => {
    const response = await request.get('/NotFound');
    expect(response.status).toBe(404);
  });
});
