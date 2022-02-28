var { createToken, verifyToken } = require('./token');

describe('createToken', () => {
  test('Create token should return a truthy value', () => {
    expect(createToken({ data: 1 }, '1day')).toBeTruthy();
  });

  test('Create token with wrong expiresIn value should throw a error', () => {
    expect(() => createToken({ data: 1 }, '1day000')).toThrow();
  });
});
