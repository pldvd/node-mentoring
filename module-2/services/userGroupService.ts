import { ModelStatic, Model } from 'sequelize';
import { IUserGroup } from '../types';

export default class UserGroupService {
  userGroupModel: ModelStatic<Model<IUserGroup, IUserGroup>>;

  constructor(userGroupModel: ModelStatic<Model<IUserGroup, IUserGroup>>) {
    this.userGroupModel = userGroupModel;
  }

  getAll() {
    return this.userGroupModel.findAll();
  }
}
