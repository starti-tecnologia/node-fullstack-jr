module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'products',
      [
        {
          orden_id: 1,
          name: 'Produto Modelo',
          price: 300,
          amount: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          orden_id: 1,
          name: 'Produto Modelo',
          price: 300,
          amount: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          orden_id: 2,
          name: 'Produto Modelo',
          price: 300,
          amount: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          orden_id: 2,
          name: 'Produto Modelo',
          price: 300,
          amount: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('products', null, {}),
};
