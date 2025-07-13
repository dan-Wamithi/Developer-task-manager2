const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Bug = require('../models/Bug');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/bugtracker_test', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Bug API', () => {
  let bugId;

  it('should create a bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({ title: 'Test Bug', description: 'Bug description' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Bug');
    bugId = res.body._id;
  });

  it('should get all bugs', async () => {
    const res = await request(app).get('/api/bugs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update bug status', async () => {
    const res = await request(app)
      .patch(`/api/bugs/${bugId}/status`)
      .send({ status: 'closed' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('closed');
  });

  it('should delete a bug', async () => {
    const res = await request(app).delete(`/api/bugs/${bugId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Bug deleted');
  });
});
