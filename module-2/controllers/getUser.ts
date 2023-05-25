import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { users } from '../data/users';

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send('User was not found');
    return;
  }

  res.status(StatusCodes.OK).json(user);
};
