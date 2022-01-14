module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'ordens',
      [
        {
          name: 'Modelo user',
          email: 'user@modelo.com',
          status: 'em-aberto',
          totalCost: 600,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Modelo user 2',
          email: 'user@modelo.com',
          status: 'em-aberto',
          totalCost: 600,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('ordens', null, {}),
};
