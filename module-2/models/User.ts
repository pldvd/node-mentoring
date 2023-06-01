import { DataTypes } from 'sequelize';
import sequelize from '../data-access';

const User = sequelize.define(
  'user',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    login: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        is: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      },
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: 4,
        max: 130,
      },
    },
    isdeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

export default User;
