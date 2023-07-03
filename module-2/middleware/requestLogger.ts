import morgan from 'morgan';
import { Request, Response } from 'express';

morgan.token('data', (req: Request, res: Response) => {
  return JSON.stringify(req.body);
});

export const requestLogger = morgan(':method :url :data');
