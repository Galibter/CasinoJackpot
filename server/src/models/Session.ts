import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../sequelizeConfig';

class Session extends Model {
  public sessionId!: string;
  public accountId!: string;
  public credits!: number;
  public updatedAt!: Date; 
}

Session.init({
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  accountId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  credits: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'sessions',
  timestamps: true 
});

export default Session;
