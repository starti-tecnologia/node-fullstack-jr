const {Sequelize, Model} = require("sequelize");

class Produto extends Model{
    static init(sequelize){
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true
                  },
                  nome: {
                      type: Sequelize.STRING,
                      allowNull: false,
                  },
                  valor_unitario: {
                      type: Sequelize.DOUBLE(10,2),
                      allowNull: false,
                  },
                  quantidade: {
                      type: Sequelize.INTEGER,
                      default: 0,
                  }
            },
            {
                sequelize
            }
        );
        return this;
    }
}

module.exports =  Produto;