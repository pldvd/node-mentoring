import { NextFunction, Request, Response } from 'express';

export const pageNotFound = (req: Request, res: Response) => {
  res.status(404).send('Not found.');
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json(err);
};
