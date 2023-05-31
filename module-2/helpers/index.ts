import { NextFunction, Request, Response } from 'express';
import { IUser } from '../types';

export const sortByLoginName = (a: IUser, b: IUser) => {
  if (a.login < b.login) {
    return -1;
  }
  if (a.login > b.login) {
    return 1;
  }
  return 0;
};

export const getAutoSuggestUsers = (
  arr: IUser[],
  loginSubstring: string | undefined,
  limit: number
): IUser[] => {
  return loginSubstring
    ? arr
        .filter((user) => user.login.includes(loginSubstring))
        .sort(sortByLoginName)
        .slice(0, limit)
    : arr.sort(sortByLoginName).slice(0, limit);
};

export const parseStringToNum = (str: string) =>
  Number(str) ? Number(str) : Number.MAX_SAFE_INTEGER;

export const errorBoundary =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res);
    } catch (e) {
      next(e);
    }
  };
