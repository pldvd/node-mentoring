import express from 'express';
import UserGroup from '../models/UserGroup';

const userGroupRouter = express.Router();

userGroupRouter.get('/', (req, res) => {
  res.send('Hello world!');
});

export default userGroupRouter;
