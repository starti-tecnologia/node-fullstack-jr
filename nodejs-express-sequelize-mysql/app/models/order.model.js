const Product = require("./product.model")

module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    clientName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    orderNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('opened', 'paid', 'canceled'),
      allowNull: false
    },
  });

  return Order;
};