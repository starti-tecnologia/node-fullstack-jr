const {Sequelize, Model} = require("sequelize");
const Pedido = require("../models/pedido");
const Produto = require("../models/produto");

class PedidoProduto extends Model{
    static init(sequelize){
        super.init(
            {
                id: {
                    primaryKey: true,
                    autoIncrement: true,
                    type: Sequelize.INTEGER
                },
                num_pedido: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'pedidos', 
                        key: 'num_pedido'
                    }
                },
                id_produto: {
                    type: Sequelize.INTEGER,
                    references: {
                        model:'produtos', 
                        key: 'id'
                    } 
                    
                }
                
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

PedidoProduto.hasMany(Pedido);
PedidoProduto.hasMany(Produto);


Person.hasMany(Father); // Set one to many relationship