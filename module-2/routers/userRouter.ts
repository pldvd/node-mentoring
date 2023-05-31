import express from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services';
import { findUser } from '../middleware/findUser';
import { validateUserData, validateFilters } from '../middleware/validators';

const userRouter = express.Router();
const userService = new UserService();

userRouter.get('/', validateFilters, async (req, res) => {
  const users = await userService.getUsers();

  res.status(StatusCodes.OK).json(users);
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

userRouter.post('/', validateUserData, async (req, res) => {
  const userData = req.body;
  const newUser = await userService.createUser(userData);

  res.status(StatusCodes.CREATED).json(newUser);
});

export default userRouter;
