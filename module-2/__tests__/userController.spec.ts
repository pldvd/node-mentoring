import { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import User from '../models/User';
import sequelizeFixtures from 'sequelize-fixtures';
import { users } from './fixtures/users';
import sequelize from '../data-access';
import { server as app } from '../app';
import { createUserData } from './mocks';

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
    app.close();
  });

  describe('GET /users', () => {
    it('GET /users should return full list of users', async () => {
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
  });

  describe('GET /users/:id', () => {
    it('should return a specific user if exists', async () => {
      const response = await request(app).get('/users/1');

      expect(response.status).toEqual(200);
      expect(response.body.id).toBe('1');
      expect(response.body.login).toBe('User1');
      expect(response.body.age).toEqual(33);
      expect(response.body.isDeleted).toBe(false);
    });

    it('should return a 404 error if user does not exist', async () => {
      const response = await request(app).get('/users/23');

      expect(response.status).toEqual(404);
      expect(response.text).toBe('User not found.');
    });
  });

  describe('POST /users', () => {
    it('should return a status of 400 if the request body is empty', async () => {
      const response = await request(app).post('/users').send({});

      expect(response.status).toEqual(400);
    });

    it('should return a status of 400 if login is missing', async () => {
      const { age, password } = createUserData;
      const response = await request(app)
        .post('/users')
        .send({ password, age });

      expect(response.status).toEqual(400);
    });

    it('should return a status of 400 if age is missing', async () => {
      const { login, password } = createUserData;
      const response = await request(app)
        .post('/users')
        .send({ password, login });

      expect(response.status).toEqual(400);
    });

    it('should return a status of 400 if password is missing', async () => {
      const { login, age } = createUserData;
      const response = await request(app).post('/users').send({ age, login });

      expect(response.status).toEqual(400);
    });

    it('should create a new user when login, user and password are present', async () => {
      const response = await request(app).post('/users').send(createUserData);

      expect(response.status).toEqual(201);
    });
  });

  describe('DELETE /users', () => {
    it('should return a 404 error when no id provided', async () => {
      const response = await request(app).delete('/users');

      expect(response.status).toEqual(404);
      expect(response.text).toBe('Not found.');
    });

    it('should return a 404 error when user with id does not exist', async () => {
      const response = await request(app).delete('/users/23');

      expect(response.status).toEqual(404);
      expect(response.text).toBe('User not found.');
    });

    it('should delete a specific user and return a success message when user exists', async () => {
      const response = await request(app).delete('/users/1');
      const successMessage = 'User with id: 1 was removed successfully.';

      expect(response.status).toEqual(200);
      expect(response.text).toBe(successMessage);
    });
  });
});
