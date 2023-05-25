import express from 'express';
import * as userController from '../controllers';

const userRouter = express.Router();

userRouter.get('/', userController.getUsers);

userRouter.get('/:id', userController.getUser);

userRouter.put('/:id', (req, res) => {
  // update user
  // add body validation
  res.status(200).send('Update user hello');
});

userRouter.delete('/:id', userController.deleteUser);

userRouter.post('/', (req, res) => {
  // create new user
  // add body validation
  res.status(200).send('Add user hello');
});

export default userRouter;
