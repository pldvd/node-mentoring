import { DataTypes } from 'sequelize';
import sequelize from '../data-access';

const { INTEGER, CHAR, ENUM, ARRAY } = DataTypes;

const Group = sequelize.define(
  'group',
  {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    name: {
      type: CHAR(50),
    },
    permissions: {
      type: ARRAY(ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
    },
  },
  {
    timestamps: false,
  }
);

export default Group;
