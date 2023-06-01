import { IUser } from '../types';
import { ModelStatic, Model, Op } from 'sequelize';

export default class UserService {
  userModel: ModelStatic<Model<any, any>>;

  constructor(userModel: ModelStatic<Model<any, any>>) {
    this.userModel = userModel;
  }

  async getUsers(limit: number, loginSubstring: string) {
    const users = await this.userModel.findAll({
      where: {
        login: {
          [Op.substring]: loginSubstring,
        },
      },
      limit,
    });
    return users;
  }

  async getUser(id: string) {
    //ORM get logic, return user
    return {};
  }

  async updateUser(id: string) {
    //ORM updat4e logic
    return {};
  }

  async deleteUser(id: string) {
    //ORM updat4e logic
    return {};
  }

  async createUser(data: Pick<IUser, 'login' | 'password' | 'age'>) {
    const newUser = await this.userModel.create(data);
    return newUser;
  }
}
