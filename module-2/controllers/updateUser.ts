import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { users } from '../data/users';

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  let user = users.find((user) => user.id === id);

  if (!user || user.isDeleted) {
    res.status(StatusCodes.NOT_FOUND).send('User was not found');
    return;
  }

  user = Object.assign(user, req.body);

  res.status(StatusCodes.OK).send('User was updated.');
};