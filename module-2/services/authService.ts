import { ModelStatic, Model } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUser, UserData } from '../types';

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default class AuthService {
  userModel: ModelStatic<Model<IUser, UserData>>;

  constructor(userModel: ModelStatic<Model<IUser, UserData>>) {
    this.userModel = userModel;
  }

  async login(userName: string, password: string) {
    const user = await this.userModel.findOne({
      where: { login: userName },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const passwordsDoMatch = await bcrypt.compare(
      password,
      user.dataValues.password
    );

    if (passwordsDoMatch) {
      const { TOKEN_SECRET = '908b095421916c751880515a' } = process.env;
      const { id, age, login: name } = user.dataValues;

      const token = await jwt.sign({ id, age, name }, TOKEN_SECRET);
      return token;
    }

    throw new UnauthorizedError('Incorrect username or password');
  }
}
