const { createToken, verifyToken } = require('../../utils/token');

test('Create token should return a truthy value', () => {
  expect(createToken({ data: 1 }, '1d')).toBeTruthy();
});

test('Create token with wrong param should throw a error', () => {
  expect(() => createToken({ data: 1 }, 'wrong-expire-time')).toThrow();
});
