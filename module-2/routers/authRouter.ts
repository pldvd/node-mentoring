import express from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthService from '../services/authService';
import User from '../models/User';

const authRouter = express.Router();
const authService = new AuthService(User);

authRouter.post('/login', (req, res, next) => {
  const { login: userName, password } = req.body;

  authService
    .login(userName, password)
    .then((token) => {
      res.json({ token });
    })
    .catch(next);
});

export default authRouter;
