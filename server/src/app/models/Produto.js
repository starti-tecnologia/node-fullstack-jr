import Sequelize, { Model } from 'sequelize';

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        pedidos_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        valor: Sequelize.DECIMAL,
        quantidade: Sequelize.DECIMAL,
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
}

export default Produto;
