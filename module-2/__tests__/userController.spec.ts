import express from 'express';
import request from 'supertest';
import User from '../models/User';
import sequelizeFixtures from 'sequelize-fixtures';
import appRouter from '../routers';
import { users } from './fixtures/users';
import app from '../app';
import sequelize from '../data-access';

const populateDB = () => {
  return sequelizeFixtures
    .loadFixtures(users, { User })
    .then(() => console.log('all good'));
};

// const clearDB = () => {
//   return User.destroy({ truncate: true });
// };

describe('userController', () => {
  // beforeEach(() => populateDB());
  // afterEach(() => clearDB());
  // afterAll(() => sequelize.close());

  // it('Should return all users upon a request to GET /users', (done) => {
  //   request(app).get('/users').expect(401, done);
  // });

  test('GET /users should return a list of users', () => {});
  test('GET /users/:id should return a specific user', () => {});
  test('POST /users should create a new user', () => {});
  test('DELETE /users should return return a specific user', () => {});
});
