import { Dialect, Sequelize } from 'sequelize';

const {
  DB_NAME = 'nodementoring',
  DB_USER = 'testuser',
  DB_PASSWORD = 'password',
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres' as Dialect,
  port: 5432,
});

export default sequelize;
