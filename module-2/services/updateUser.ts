import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestWithUser } from '../types';
import { errorBoundary } from '../helpers';

const updateUser = (req: RequestWithUser, res: Response) => {
  let user = req.user!;
  user = Object.assign(user, req.body);

  res.status(StatusCodes.OK).send('User was updated.');
};

export default errorBoundary(updateUser);
