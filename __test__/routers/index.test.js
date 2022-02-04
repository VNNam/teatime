const request = require('supertest');
const app = require('../../app');

test('Get / should return a status 200', async () => {
  const response = await request(app).get('/');
  expect(response.statusCode).toBe(200);
});
