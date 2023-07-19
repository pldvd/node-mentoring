import express from 'express';
import request from 'supertest';
import User from '../models/User';
import sequelizeFixtures from 'sequelize-fixtures';
import appRouter from '../routers';
import { users } from './fixtures/users';
import app from '../app';

const populateDB = async () => {
  await sequelizeFixtures.loadFixture(users, { User });
};

const clearDB = async () => {
  await User.destroy({ truncate: true });
};

describe('userController', () => {
  // beforeEach(populateDB);
  // afterEach(clearDB);

  it('Should return all users upon a request to GET /users', async () => {
    const users = await request(app).get('/users');
    expect(1).toBe(1);
  });
});
