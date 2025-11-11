import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('spiritland', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});
