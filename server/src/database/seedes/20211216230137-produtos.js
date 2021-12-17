module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'produtos',
      [
        {
          pedidos_id: 1,
          name: 'Produto Modelo',
          valor: 300,
          quantidade: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pedidos_id: 1,
          name: 'Produto Modelo',
          valor: 300,
          quantidade: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pedidos_id: 2,
          name: 'Produto Modelo',
          valor: 300,
          quantidade: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pedidos_id: 2,
          name: 'Produto Modelo',
          valor: 200,
          quantidade: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('produtos', null, {}),
};
