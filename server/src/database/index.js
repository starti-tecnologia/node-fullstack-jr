import { Sequelize } from 'sequelize';
require('dotenv/config');

import Pedido from '../app/models/Pedido';
import Produto from '../app/models/Produto';

import databaseConfig from '../config/database';

const models = [Pedido, Produto];

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
