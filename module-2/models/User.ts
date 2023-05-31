import { DataTypes } from 'sequelize';
import sequelize from '../data-access';

const User = sequelize.define('User', {
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
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default User;
