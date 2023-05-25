import express from 'express';
import * as userController from '../controllers';
import { findUser } from '../middleware/findUser';
import { validateUserData, validateFilters } from '../middleware/validators';

const userRouter = express.Router();

userRouter.get('/', validateFilters, userController.getUsers);

userRouter.get('/:id', findUser, userController.returnUser);

userRouter.put('/:id', validateUserData, findUser, userController.updateUser);

userRouter.delete('/:id', findUser, userController.deleteUser);

userRouter.post('/', validateUserData, userController.createUser);

export default userRouter;
