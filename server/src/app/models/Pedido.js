import Sequelize, { Model } from 'sequelize';
import { STATUS } from './StatusEnum'

class Pedido extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
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
    this.hasMany(models.Produto, { foreignKey: 'pedidos_id', as: 'produto' });
  }
}

export default Pedido;
