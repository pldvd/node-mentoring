import { Request } from 'express';

export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted?: boolean;
}

export interface RequestWithUser extends Request {
  user?: IUser;
}

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface IGroup {
  id: string;
  name: string;
  permissions: Permission[];
}
