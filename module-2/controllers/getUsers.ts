import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { users } from '../data/users';
import {
  parseStringToNum,
  getAutoSuggestUsers,
  errorBoundary,
} from '../helpers';

const getUsers = (req: Request, res: Response) => {
  const activeUsers = users.filter((user) => !user.isDeleted);
  const { limit, loginSubstring } = req.query;
  const parsedLimit = parseStringToNum(limit as string);

  const usersFiltered = getAutoSuggestUsers(
    activeUsers,
    loginSubstring as string,
    parsedLimit
  );

  res.status(StatusCodes.OK).json(usersFiltered);
};

export default errorBoundary(getUsers);
