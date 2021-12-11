const { type } = require("express/lib/response");
const sequelizeConnection = require("../config/connection")
const {Pedido} = require("../models/pedido")

module.exports = {

   async editarPedido(req, res){
       const {nome_cliente, email, produtos, status} = req.body;
      
        try{
            [_,pedido] = await sequelizeConnection.query(`SELECT * FROM pedidos WHERE num_pedido = ${req.params.id}`)
            await sequelizeConnection.query(`
                UPDATE pedidos SET nome_cliente = '${nome_cliente ?? pedido[0].nome_cliente}', email = '${email ?? pedido[0].email}', produtos = '${produtos ?? pedido[0].produtos}', status = '${status}' WHERE num_pedido = ${req.params.id}
            `);
            return res.sendStatus(200);
        } catch(err){
            console.log(err)
            return [res.sendStatus(400), err];
        }  
   },

   async buscarTodosPedidos(req, res){
      try{
         const [pedidos, _] = await sequelizeConnection.query(`
            SELECT * FROM pedidos
         `);
         
         return res.send(pedidos);
      } catch(err){
         return [res.sendStatus(400), err];
      }  
   },

   async buscarPedido(req, res){
      try{
         const [pedidos, _] = await sequelizeConnection.query(`
            SELECT ped.nome_cliente, ped.email, ped.status, prod.nome, prod.valor_unitario
            FROM pedidos as ped INNER JOIN produtos_pedidos as prod_ped
            ON ped.num_pedido = prod_ped.num_pedido INNER JOIN produtos as prod ON
            prod_ped.id_produto = prod.id WHERE ped.num_pedido = ${req.params.id}
         `);
         
         return res.send(pedidos);
      } catch(err){
         return [res.sendStatus(400), err];
      }  
   },
   
   criarPedido(req, res){
      const {nome_cliente, email, produtos} = req.body;
      try{
         sequelizeConnection.query(`
         INSERT INTO pedidos VALUES
         (DEFAULT, '${nome_cliente}', '${email}', "${produtos}", 'em aberto')
      `)
      .then(function(pedido) {
         const produtosJson = JSON.parse(produtos)
            for (var produto in produtosJson){
               sequelizeConnection.query(`
                  INSERT INTO produtos_pedidos VALUES
                  (DEFAULT, '${pedido[0]}', '${produtosJson[produto]}')
               `)
            }
            
         })
         return res.sendStatus(200);
      } catch(err){
         console.log(err)
         return [res.sendStatus(400), err];
      }  
   },

   async deletarPedido(req,res){
      try{
         await sequelizeConnection.query(
            `DELETE FROM pedidos WHERE num_pedido = ${req.params.id}`
         );
         return res.sendStatus(200);
      }catch(err){
         return [res.sendStatus(500), err]
      }
   }
}