const Sequelize = require('sequelize');
require('dotenv').config({path: "../../.env"})

const database = process.env.DB_DATABASE;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dialect  = process.env.DB_DIALECT;
const host     = process.env.DB_HOST;


const connection = new Sequelize(database, username, password, {
    host, 
    dialect
});

module.exports = connection;
