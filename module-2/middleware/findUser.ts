import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { users } from '../data/users';
import { RequestWithUser } from '../types';

export const findUser = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);

  if (!user || user.isDeleted) {
    res.status(StatusCodes.NOT_FOUND).send('User was not found');
    return;
  }

  req.user = user;
  next();
};
