module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ordens', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      totalCost: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['em-aberto', 'pago', 'cancelado'],
        defaultValue: 'em-aberto'
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
    return queryInterface.dropTable('ordens');
  },
};
