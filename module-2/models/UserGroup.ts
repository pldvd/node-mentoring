import sequelize from '../data-access';
import { DataTypes } from 'sequelize';
import User from './User';
import Group from './Group';

const { INTEGER } = DataTypes;

const UserGroup = sequelize.define('usergroup', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

export default UserGroup;
