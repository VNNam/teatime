const { createToken } = require('./token');

describe('createtoken', () => {
  test('', () => {
    expect(() => createToken({ data: 1 }, '1h')).toBeTruthy();
  });
  test('', () => {
    expect(() => createToken({ data: 1 }, '1h0')).toThrow();
  });
});
