import { NextFunction, Request, Response } from 'express';

export function pageNotFound(req: Request, res: Response, next: NextFunction) {
  res.status(404).send('Page not found.');
}
