const {Sequelize, Model} = require("sequelize");

class Pedido extends Model{
    static init(sequelize){
        super.init(
            {
                num_pedido: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                },
                nome_cliente: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                produtos: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
                status: {
                    type: Sequelize.ENUM('pago', 'cancelado'),
                    allowNull: false,
                }
            },
            {
                sequelize
            }
        );
        return this;
    }
}

module.exports =  Pedido;