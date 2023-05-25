import { Request, Response } from 'express';
import { users } from '../data/users';

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);

  if (!user) {
    res.status(404).send('User was not found');
    return;
  }

  res.status(200).json(user);
};
