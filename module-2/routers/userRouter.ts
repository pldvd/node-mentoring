import express from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services';
import { findUser } from '../middleware/findUser';
import { validateUserData, validateFilters } from '../middleware/validators';
import User from '../models/User';

const userRouter = express.Router();
const userService = new UserService(User);

userRouter.get('/', validateFilters, (req, res) => {
  userService
    .getUsers()
    .then((users) => {
      res.status(StatusCodes.OK).json(users);
    })
    .catch((e) => res.json(e));
});

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUser(id);

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send('User not found.');
  } else {
    res.status(StatusCodes.OK).json(user);
  }
});

userRouter.put('/:id', validateUserData, findUser, async (req, res) => {
  const { id } = req.params;
  const updatedUser = userService.updateUser(id);

  res.status(StatusCodes.OK).json(updatedUser);
});

userRouter.delete('/:id', findUser, async (req, res) => {
  const { id } = req.params;
  const deletedUser = await userService.deleteUser(id);

  res.status(StatusCodes.OK).json(deletedUser);
});

userRouter.post('/', validateUserData, (req, res) => {
  const userData = req.body;

  userService
    .createUser(userData)
    .then((newUser) => res.status(StatusCodes.CREATED).json(newUser))
    .catch((e) => res.json(e));
});

export default userRouter;
