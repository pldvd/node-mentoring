import { IUser } from '../types';
import { ModelStatic, Model, Op, where } from 'sequelize';

export default class UserService {
  userModel: ModelStatic<Model<any, any>>;

  constructor(userModel: ModelStatic<Model<any, any>>) {
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
    });
  }

  getUser(id: string) {
    return this.userModel.findByPk(id);
  }

  updateUser(id: string, userData: Pick<IUser, 'login' | 'password' | 'age'>) {
    return this.userModel.update(userData, { where: { id } });
  }

  deleteUser(id: string) {
    return this.userModel.destroy({ where: { id } });
  }

  createUser(data: Pick<IUser, 'login' | 'password' | 'age'>) {
    return this.userModel.create(data);
  }
}
