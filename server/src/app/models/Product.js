import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        orden_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        price: Sequelize.DECIMAL,
        amount: Sequelize.DECIMAL,
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
}

export default Product;
