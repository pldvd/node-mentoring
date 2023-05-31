import express from 'express';
import * as userService from '../services';
import { findUser } from '../middleware/findUser';
import { validateUserData, validateFilters } from '../middleware/validators';

const userRouter = express.Router();

userRouter.get('/', validateFilters, userService.getUsers);

userRouter.get('/:id', findUser, userService.returnUser);

userRouter.put('/:id', validateUserData, findUser, userService.updateUser);

userRouter.delete('/:id', findUser, userService.deleteUser);

userRouter.post('/', validateUserData, userService.createUser);

export default userRouter;
