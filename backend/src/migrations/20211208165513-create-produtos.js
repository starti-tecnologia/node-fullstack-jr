'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.createTable('produtos',{
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nome: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      valor_unitario: {
          type: Sequelize.DECIMAL,
          allowNull: false,
      },
      quantidade: {
          type: Sequelize.INTEGER,
          default: 0,
      }
     });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('produtos');
  }
};
