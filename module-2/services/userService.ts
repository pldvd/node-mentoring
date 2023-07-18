import { IUser, UserData } from '../types';
import { ModelStatic, Model, Op } from 'sequelize';
import Group from '../models/Group';
import { hashPassword } from '../utils/auth';

export default class UserService {
  userModel: ModelStatic<Model<IUser, UserData>>;

  constructor(userModel: ModelStatic<Model<IUser, UserData>>) {
    this.userModel = userModel;
  }

  getUsers(limit: number, loginSubstring: string) {
    return this.userModel.findAll({
      where: {
        login: {
          [Op.substring]: loginSubstring,
        },
      },
      order: [['login', 'ASC']],
      limit,
      include: Group,
    });
  }

  getUser(id: string) {
    return this.userModel.findByPk(id, { include: Group });
  }

  updateUser(id: string, userData: UserData) {
    return this.userModel.update(userData, { where: { id } });
  }

  deleteUser(id: string) {
    return this.userModel.destroy({ where: { id } });
  }

  async createUser(userData: UserData) {
    const hashedPassword = await hashPassword(userData.password);
    return this.userModel.create({ ...userData, password: hashedPassword });
  }
}
