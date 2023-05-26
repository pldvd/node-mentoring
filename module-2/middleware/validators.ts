import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userSchema, filterIngSchema } from '../schema';

export const validateUserData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  } else {
    next();
  }
};

export const validateFilters = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = filterIngSchema.validate(req.query);

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  } else {
    next();
  }
};
