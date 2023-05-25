import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { users } from '../data/users';
import { User } from '../types';

const sortByLoginName = (a: User, b: User) => {
  if (a.login < b.login) {
    return -1;
  }
  if (a.login > b.login) {
    return 1;
  }
  return 0;
};

const getAutoSuggestUsers = (
  arr: User[],
  loginSubstring: string | undefined,
  limit: number
): User[] => {
  return loginSubstring
    ? arr
        .filter((user) => user.login.includes(loginSubstring))
        .sort(sortByLoginName)
        .slice(0, limit)
    : arr.sort(sortByLoginName).slice(0, limit);
};

const parseStringToNum = (str: string) =>
  Number(str) ? Number(str) : Number.MAX_SAFE_INTEGER;

export const getUsers = (req: Request, res: Response) => {
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
