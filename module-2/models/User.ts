import { DataTypes } from 'sequelize';
import sequelize from '../data-access';

const { INTEGER, STRING, BOOLEAN } = DataTypes;

const User = sequelize.define(
  'user',
  {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    login: {
      type: STRING,
    },
    password: {
      type: STRING,
      validate: {
        is: /^\$2[ayb]\$.{56}$/,
      },
    },
    age: {
      type: INTEGER,
      validate: {
        min: 4,
        max: 130,
      },
    },
    isDeleted: {
      type: BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

export default User;
