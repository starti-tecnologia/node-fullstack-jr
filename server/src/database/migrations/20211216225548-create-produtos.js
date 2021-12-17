module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('produtos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      pedidos_id: {
        type: Sequelize.INTEGER,
        references: { model: 'pedidos', key: 'id' },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('produtos');
  },
};
