import express from 'express';
import userRouter from './userRouter';
import groupRouter from './groupRouter';

const appRouter = express.Router();

appRouter.get('/', (req, res) => {
  res.redirect('/users');
});

appRouter.use('/users', userRouter);
appRouter.use('/groups', groupRouter);

export default appRouter;
