import express from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthService from '../services/authService';
import User from '../models/User';

const authRouter = express.Router();
const authService = new AuthService(User);

authRouter.post('/login', async (req, res, next) => {
  const { login: userName, password } = req.body;
  const user = await authService.login(userName, password);

  res.json({ user });
});

export default authRouter;
