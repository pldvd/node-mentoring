import { Request } from 'express';

export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted?: boolean;
};

export interface RequestWithUser extends Request {
  user?: User;
}
