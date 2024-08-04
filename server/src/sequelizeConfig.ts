import { Sequelize } from 'sequelize';

// Credentials should be stored hashed and salted
const sequelize = new Sequelize('slot_machine_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;

