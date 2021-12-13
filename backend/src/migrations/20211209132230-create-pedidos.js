'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('pedidos',{
      num_pedido: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
      },
      nome_cliente: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      produtos: {
          type: Sequelize.JSON,
          allowNull: false,
      },
      status: {
          type: Sequelize.ENUM('pago', 'cancelado'),
          allowNull: false,
      }
  });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pedidos');
  }
};
