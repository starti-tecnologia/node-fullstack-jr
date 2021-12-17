module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'pedidos',
      [
        {
          name: 'Modelo user',
          email: 'user@modelo.com',
          status: 'em-aberto',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Modelo user 2',
          email: 'user@modelo.com',
          status: 'em-aberto',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('pedidos', null, {}),
};
