import express from 'express';
import userRouter from './userRouter';

const appRouter = express.Router();

appRouter.get('/', (req, res) => {
  res.redirect('/users');
});

appRouter.use('/users', userRouter);

export default appRouter;
