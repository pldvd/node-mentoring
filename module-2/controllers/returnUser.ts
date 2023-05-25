import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestWithUser } from '../types';

export const returnUser = (req: RequestWithUser, res: Response) => {
  let user = req.user!;

  res.status(StatusCodes.OK).json(user);
};
