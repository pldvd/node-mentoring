import express from 'express';
import userRouter from './userRouter';
import groupRouter from './groupRouter';
import userGroupRouter from './userGroupRouter';
import authRouter from './authRouter';

const appRouter = express.Router();

appRouter.get('/', (req, res) => {
  res.redirect('/users');
});

appRouter.use('/users', userRouter);
appRouter.use('/groups', groupRouter);
appRouter.use('/user-groups', userGroupRouter);
appRouter.use('/auth', authRouter);

export default appRouter;
