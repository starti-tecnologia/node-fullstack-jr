const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./product.model.js")(sequelize, Sequelize);
db.orders = require ("./order.model")(sequelize, Sequelize);

db.orders.belongsToMany(db.products, {
  through: "order_product",
  as: "products",
  foreignKey: "product_Id",
});

db.products.belongsToMany(db.orders, {
  through: "order_product",
  as: "orders",
  foreignKey: "order_Id",
});

module.exports = db;