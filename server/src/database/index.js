import { Sequelize } from 'sequelize';
require('dotenv/config');

import Orden from '../app/models/Orden';
import Product from '../app/models/Product';

import databaseConfig from '../config/database';

const models = [Orden, Product];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connetion = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connetion))
      .map(
        (model) => model.associate && model.associate(this.connetion.models)
      );
  }
}

export default new Database();
