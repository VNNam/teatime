const request = require('supertest');
const app = require('../app');
describe('login test case', () => {
  test('get/ should a status 200', async () => {
    const res = await request(app).get('/users/login');
    expect(res.statusCode).toBe(200);
  });
});
