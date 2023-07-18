import { StatusCodes } from 'http-status-codes';
import { NotFoundError, UnauthorizedError } from '../services/authService';

export const getHttpStatusCodeFromError = (err: Error) => {
  if (err instanceof NotFoundError) {
    return StatusCodes.NOT_FOUND;
  }
  if (err instanceof UnauthorizedError) {
    return StatusCodes.UNAUTHORIZED;
  }

  return StatusCodes.INTERNAL_SERVER_ERROR;
};
