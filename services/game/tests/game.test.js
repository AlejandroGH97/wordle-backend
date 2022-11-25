const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');

require('dotenv').config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe('GET /game/init', () => {
  it('should return todays word', async () => {
    const res = await request(app).get('/game/init');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('todaysWord');
  });
});

describe('GET /game/init', () => {
  it('should return a five letter word', async () => {
    const res = await request(app).get('/game/init');
    expect(res.statusCode).toBe(200);
    expect(res.body.todaysWord.value.length).toBe(5);
  });
});

describe('GET /game/init', () => {
  it('should return the dictionary', async () => {
    const res = await request(app).get('/game/init');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('dictionary');
    // expect(res.todaysWord.value.length).toBeEqual(5);
  });
});
