const mongoose = require('mongoose');
const request = require('supertest');
const User = require('../models/user');
const app = require('../index');
const { generateAccessToken } = require('@wordle/auth-middleware');

require('dotenv').config();

const user_id = '63812991bf96d41e631bd686';

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_TEST);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe('POST /auth/signup', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({
        username: 'testUser',
        password: 'testUser',
      })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('User registered successfully.');
    await User.deleteOne({ username: 'testUser' });
  });
});

describe('POST /auth/signup', () => {
  it('should say username taken', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({
        username: 'test',
        password: 'test',
      })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Username Already Taken.');
  });
});

describe('POST /auth/login', () => {
  it('should return jwt', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'test',
        password: 'test',
      })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.token.length).toBeGreaterThan(0);
  });
});

describe('POST /users/finish', () => {
  it('should update user stats', async () => {
    token = generateAccessToken(user_id);
    const res = await request(app)
      .post('/users/finish')
      .set('Authorization', `Bearer ${token}`)
      .send({ value: 'tests', tries: 5 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('1');
    expect(res.body).toHaveProperty('2');
    expect(res.body).toHaveProperty('3');
    expect(res.body).toHaveProperty('4');
    expect(res.body).toHaveProperty('5');
    expect(res.body).toHaveProperty('6');
    expect(res.body).toHaveProperty('fail');
  });
});

describe('GET /users/stats', () => {
  it('should get user stats', async () => {
    token = generateAccessToken(user_id);
    const res = await request(app)
      .get('/users/stats')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('statistics');
    expect(res.body.statistics).toHaveProperty('1');
    expect(res.body.statistics).toHaveProperty('2');
    expect(res.body.statistics).toHaveProperty('3');
    expect(res.body.statistics).toHaveProperty('4');
    expect(res.body.statistics).toHaveProperty('5');
    expect(res.body.statistics).toHaveProperty('6');
    expect(res.body.statistics).toHaveProperty('fail');
  });
});
