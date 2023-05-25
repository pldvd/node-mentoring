import express from 'express';
import * as userController from '../controllers';
import { findUser } from '../middleware/findUser';

const userRouter = express.Router();

userRouter.get('/', userController.getUsers); // validate search query,

userRouter.get('/:id', findUser, userController.returnUser);

userRouter.put('/:id', findUser, userController.updateUser); // validate body

userRouter.delete('/:id', findUser, userController.deleteUser);

userRouter.post('/', userController.createUser); // validate body

export default userRouter;
