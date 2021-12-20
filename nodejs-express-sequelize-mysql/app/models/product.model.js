module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    unitaryValue: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
    
  });
  
  return Product;
};

