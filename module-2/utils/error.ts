import { ErrorsEnum } from '../types';
import { StatusCodes } from 'http-status-codes';

export const getHttpStatusCodeFromError = (err: Error) => {
  switch (err.name) {
    case ErrorsEnum.NOT_FOUND:
      return StatusCodes.NOT_FOUND;
    case ErrorsEnum.UNAUTHENTICATED:
      return StatusCodes.UNAUTHORIZED;
    default:
      return StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE;
  }
};
