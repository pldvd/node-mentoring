import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { users } from '../data/users';

export const getUsers = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(users);
};
