import { IGroup, GroupData } from '../types';
import { ModelStatic, Model } from 'sequelize';
import User from '../models/User';

export default class GroupService {
  groupModel: ModelStatic<Model<IGroup, GroupData>>;

  constructor(groupModel: ModelStatic<Model<IGroup, GroupData>>) {
    this.groupModel = groupModel;
  }

  getGroups() {
    return this.groupModel.findAll({ include: User });
  }

  getGroup(id: string) {
    return this.groupModel.findByPk(id, { include: User });
  }

  updateGroup(id: string, groupData: GroupData) {
    return this.groupModel.update(groupData, { where: { id } });
  }

  deleteGroup(id: string) {
    return this.groupModel.destroy({ where: { id } });
  }

  createGroup(groupData: GroupData) {
    return this.groupModel.create(groupData);
  }
}
