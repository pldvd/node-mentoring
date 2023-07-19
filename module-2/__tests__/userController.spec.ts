import { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import User from '../models/User';
import sequelizeFixtures from 'sequelize-fixtures';
import { users } from './fixtures/users';
import sequelize from '../data-access';
import app from '../app';

jest.mock('../middleware/checkToken', () =>
  jest.fn((req: Request, res: Response, next: NextFunction) => next())
);

const populateDB = () => {
  return sequelizeFixtures.loadFixtures(users, { User });
};

const clearDB = () => {
  return User.destroy({ truncate: true, cascade: true });
};

describe('userController', () => {
  beforeEach(() => populateDB());
  afterEach(() => clearDB());
  afterAll(() => {
    sequelize.close();
  });

  test('GET /users should return full list of users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(4);
  });

  test('GET /users/:id should return a specific user', async () => {
    const response = await request(app).get('/users/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toBe('1');
    expect(response.body.login).toBe('User1');
    expect(response.body.age).toBe(33);
  });

  // test('POST /users should create a new user', () => {});
  // test('DELETE /users should return return a specific user', () => {});
});
