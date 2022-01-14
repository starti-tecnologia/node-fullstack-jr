import Sequelize, { Model } from 'sequelize';
import { STATUS } from './StatusEnum'

class Orden extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        totalCost: {
          type: Number,
          default: 0,
          required: true,
        },
        status: {
          type: String,
          enum: Object.values(STATUS)
        }
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.hasMany(models.Product, { foreignKey: 'orden_id', as: 'orden' });
  }
}

export default Orden;
