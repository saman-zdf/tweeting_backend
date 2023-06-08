import { jwtAccessToken, verifyToken } from '../../lib/jwt';

describe('Access Token & Verify Token', () => {
  test('Should return error and have no id and email', () => {
    const payload = {};
    const token = jwtAccessToken(payload);
    const decoded = verifyToken(token!);
    expect(token).not.toBeNull();
    expect(decoded).not.toHaveProperty('id');
    expect(decoded).not.toHaveProperty('email');
  });

  test('Should create an access token from payload', () => {
    const payload = {
      id: 1,
      username: 'Tom',
      email: 'tom@gmail.com',
      role: 'USER',
      password: 'secret',
      createAt: new Date(),
      updatedAt: new Date(),
    };
    const token = jwtAccessToken(payload);
    expect(token).not.toBeNull();
    expect(token).toBeTruthy();
  });

  test('Should verify token with empty payload should return nothing.', () => {
    const payload = {};
    const token = jwtAccessToken(payload);
    const decoded = verifyToken(token!);

    expect(decoded).not.toHaveProperty('id');
  });

  test('Should verify token and return the correct payload', () => {
    const payload = {
      id: 1,
      username: 'Daniel',
      email: 'dani@gmail.com',
      role: 'USER',
      password: 'super-secret',
      createAt: new Date(),
      updatedAt: new Date(),
    };
    const token = jwtAccessToken(payload);
    const decoded = verifyToken(token!);

    expect(decoded).toHaveProperty('id');
    expect(decoded?.username).toBe('Daniel');
    expect(decoded?.email).toBe('dani@gmail.com');
  });
});
