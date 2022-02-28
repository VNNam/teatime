const request = require('supertest');
const app = require('../app');
<<<<<<< HEAD
describe('login test case', () => {
  test('get/ should a status 200', async () => {
    const res = await request(app).get('/users/login');
    expect(res.statusCode).toBe(200);
=======

describe('Router /', () => {
  test('Get / should return a status 200', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
  });
});

describe('Router /test', () => {
  test('Get /test should return a status 200', async () => {
    const response = await request(app).post('/test').send({ x: 10, y: 20 });

    expect(response.statusCode).toBe(200);
  });

  test('Post /test should return data as {x, y}', async () => {
    const response = await request(app).post('/test').send({ x: 10, y: 20 });

    expect(response.body.x).toBe(10);
    expect(response.body.y).toBe(20);
>>>>>>> main
  });
});
