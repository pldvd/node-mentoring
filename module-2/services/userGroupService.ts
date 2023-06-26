import { ModelStatic, Model } from 'sequelize';
import sequelize from '../data-access';
import { IUserGroup } from '../types';

export default class UserGroupService {
  userGroupModel: ModelStatic<Model<IUserGroup, IUserGroup>>;

  constructor(userGroupModel: ModelStatic<Model<IUserGroup, IUserGroup>>) {
    this.userGroupModel = userGroupModel;
  }

  getAll() {
    return this.userGroupModel.findAll();
  }

  addUsersToGroup(groupId: string, userIds: string[]) {
    const newEntries = userIds.map((id) => ({ groupId, userId: id }));

    return sequelize.transaction(async (t) => {
      return await this.userGroupModel.bulkCreate(newEntries, {
        transaction: t,
      });
    });
  }
}
