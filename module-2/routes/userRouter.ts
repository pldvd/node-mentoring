import express from 'express';
import * as userController from '../controllers';
import { findUser } from '../middleware/findUser';

const userRouter = express.Router();

userRouter.get('/', userController.getUsers); // validate search query, add filtering and limit

userRouter.get('/:id', findUser, userController.returnUser);

userRouter.put('/:id', findUser, userController.updateUser);

userRouter.delete('/:id', findUser, userController.deleteUser);

userRouter.post('/', (req, res) => {
  // create new user
  // add body validation
  res.status(200).send('Add user hello');
});

export default userRouter;
