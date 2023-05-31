import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestWithUser } from '../types';
import { errorBoundary } from '../helpers';

const deleteUser = (req: RequestWithUser, res: Response) => {
  const user = req.user!;
  user.isDeleted = true;

  res.status(StatusCodes.OK).send('User was deleted successfully.');
};

export default errorBoundary(deleteUser);
