import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(StatusCodes.UNAUTHORIZED).send('Missing access token');
  }

  // If it does not start with bearer, we consider its value to be malformed/invalid
  const token = authHeader.startsWith('Bearer ')
    ? authHeader?.split(' ')[1]
    : 'invalid';

  const { TOKEN_SECRET = '908b095421916c751880515a' } = process.env;

  jwt.verify(token, TOKEN_SECRET, (err, token) => {
    if (err) {
      res.status(StatusCodes.FORBIDDEN).send('Invalid token');
      return;
    }

    next();
  });
};
