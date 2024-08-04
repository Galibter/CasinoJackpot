import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../sequelizeConfig';

interface AccountAttributes {
  accountId: string;
  credits: number;
}

class Account extends Model<AccountAttributes>
  implements AccountAttributes {
  public accountId!: string;
  public credits!: number;
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
});

export default Account;
