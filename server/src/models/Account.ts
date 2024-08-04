import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../sequelizeConfig';

class Account extends Model {
  public accountId!: string;
  public credits!: number;
  public updatedAt!: Date; 
}

Account.init({
  accountId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  credits: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'accounts',
  timestamps: true 
});

export default Account;
