import morgan from 'morgan';
import { Request, Response } from 'express';

export const requestLogger = morgan((tokens, req: Request, res: Response) => {
  const { method, url } = tokens;
  const data = req.body || {};

  // prettier-ignore
  return `Calling ${method(req, res)} ${url(req, res)} with data: ${JSON.stringify(data)}`;
});
