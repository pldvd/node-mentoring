import express from 'express';
import userRouter from './userRouter';
import groupRouter from './groupRouter';
import userGroupRouter from './userGroupRouter';
import authRouter from './authRouter';
import { checkToken } from '../middleware/checkToken';

const appRouter = express.Router();

appRouter.get('/', (req, res) => {
  res.redirect('/users');
});

appRouter.use('/users', checkToken, userRouter);
appRouter.use('/groups', checkToken, groupRouter);
appRouter.use('/user-groups', checkToken, userGroupRouter);
appRouter.use('/auth', authRouter);

export default appRouter;
