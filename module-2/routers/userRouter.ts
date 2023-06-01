import express from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services';
import { findUser } from '../middleware/findUser';
import { validateUserData, validateFilters } from '../middleware/validators';
import User from '../models/User';

const userRouter = express.Router();
const userService = new UserService(User);

userRouter.get('/', validateFilters, (req, res, next) => {
  const { limit = Number.MAX_SAFE_INTEGER, loginSubstring = '' } = req.query;

  userService
    .getUsers(+limit, loginSubstring as string)
    .then((users) => {
      res.status(StatusCodes.OK).json(users);
    })
    .catch(next);
});

userRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;

  userService
    .getUser(id)
    .then((user) => {
      user === null
        ? res.status(StatusCodes.NOT_FOUND).send('User not found.')
        : res.status(StatusCodes.OK).json(user);
    })
    .catch(next);
});

userRouter.put('/:id', validateUserData, findUser, (req, res, next) => {
  const { id } = req.params;

  userService
    .updateUser(id, req.body)
    .then(() =>
      res
        .status(StatusCodes.OK)
        .send(`User with id: ${id} was updated successfully.`)
    )
    .catch(next);
});

userRouter.delete('/:id', findUser, (req, res, next) => {
  const { id } = req.params;

  userService
    .deleteUser(id)
    .then(() =>
      res
        .status(StatusCodes.OK)
        .send(`User with id: ${id} was removed successfully.`)
    )
    .catch(next);
});

userRouter.post('/', validateUserData, (req, res, next) => {
  const userData = req.body;

  userService
    .createUser(userData)
    .then((newUser) => res.status(StatusCodes.CREATED).json(newUser))
    .catch(next);
});

export default userRouter;
