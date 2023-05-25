import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../data/users';

export const createUser = (req: Request, res: Response) => {
  const { password, login, age } = req.body;
  const newUser = {
    id: uuidv4(),
    login,
    password,
    age,
  };

  users.push(newUser);

  res.status(StatusCodes.OK).send('User was successfully created');
};
