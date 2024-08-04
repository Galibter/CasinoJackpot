import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../sequelizeConfig';

interface SessionAttributes {
  sessionId: string;
  credits: number;
}

class Session extends Model<SessionAttributes>
  implements SessionAttributes {
  public sessionId!: string;
  public credits!: number;
}

Session.init({
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  credits: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'sessions',
});

export default Session;
