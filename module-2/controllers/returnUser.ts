import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestWithUser } from '../types';
import { errorBoundary } from '../helpers';

const returnUser = (req: RequestWithUser, res: Response) => {
  res.status(StatusCodes.OK).json(req.user);
};

export default errorBoundary(returnUser);
