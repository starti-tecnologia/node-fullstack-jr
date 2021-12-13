'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('produtos_pedidos',{
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      num_pedido: {
        type: Sequelize.INTEGER,
        references: {
            model: 'pedidos', 
            key: 'num_pedido'
        }
      },
      id_produto: {
        type: Sequelize.INTEGER,
        references: {
            model:'produtos', 
            key: 'id'
        } 
    }
      
  });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('produtos_pedidos');
  }
};
