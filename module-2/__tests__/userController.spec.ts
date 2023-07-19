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

    response.body.forEach((user) => {
      expect(user).toHaveProperty('login');
      expect(user).toHaveProperty('password');
      expect(user).toHaveProperty('age');
      expect(user).toHaveProperty('isDeleted');
    });
  });

  test('GET /users/:id should return a specific user', async () => {
    const response = await request(app).get('/users/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toBe('1');
    expect(response.body.login).toBe('User1');
    expect(response.body.age).toEqual(33);
    expect(response.body.isDeleted).toBe(false);
  });

  test('POST /users should create a new user', async () => {});

  test('DELETE /users should delete a specific user and return a success message', async () => {
    const response = await request(app).delete('/users/1');
    const successMessage = 'User with id: 1 was removed successfully.';

    expect(response.status).toEqual(200);
    expect(response.text).toBe(successMessage);
  });
});
