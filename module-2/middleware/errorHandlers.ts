import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import { getHttpStatusCodeFromError } from '../utils/error';

export const notFound = (req: Request, res: Response) => {
  res.status(404).send('Not found.');
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);

  const statusCode = getHttpStatusCodeFromError(err);
  const message = err.message;

  res.status(statusCode).json({ message });
};
