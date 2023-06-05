import { IUser, IGroup } from '../types';
import { ModelStatic, Model, Op } from 'sequelize';

export default class GroupService {
  groupModel: ModelStatic<Model<any, any>>;

  constructor(groupModel: ModelStatic<Model<any, any>>) {
    this.groupModel = groupModel;
  }

  getGroups() {
    return this.groupModel.findAll();
  }

  getGroup(id: string) {
    return this.groupModel.findByPk(id);
  }

  updateGroup(id: string, groupData: Pick<IGroup, 'name' | 'permissions'>) {
    return this.groupModel.update(groupData, { where: { id } });
  }

  deleteGroup(id: string) {
    return this.groupModel.destroy({ where: { id } });
  }

  createGroup(data: Pick<IGroup, 'name' | 'permissions'>) {
    return this.groupModel.create(data);
  }
}
