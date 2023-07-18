import { ModelStatic, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import { IUser, UserData } from '../types';

export default class AuthService {
  userModel: ModelStatic<Model<IUser, UserData>>;

  constructor(userModel: ModelStatic<Model<IUser, UserData>>) {
    this.userModel = userModel;
  }

  async login(userName: string, password: string) {
    const user = await this.userModel.findOne({ where: { login: userName } });

    return user;
  }
}
