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

export enum PermissionEnum {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  SHARE = 'SHARE',
  UPLOAD_FILES = 'UPLOAD_FILES',
}

export interface IGroup {
  id: string;
  name: string;
  permissions: PermissionEnum[];
}
