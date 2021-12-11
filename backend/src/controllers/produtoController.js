const sequelizeConnection = require("../config/connection")
const {Produto } = require("../models/produto")

module.exports = {

   async editarProduto(req, res){
      const {nome, valor_unitario, quantidade} = req.body;
      
      try{
         [_,produto] = await sequelizeConnection.query(`SELECT * FROM produtos WHERE id = ${req.params.id}`)
         await sequelizeConnection.query(`
            UPDATE produtos SET nome = '${nome ?? produto[0].nome}', valor_unitario = ${valor_unitario ?? produto[0].valor_unitario}, quantidade = ${quantidade ?? produto[0].quantidade} WHERE id = ${req.params.id}
         `);
         return res.sendStatus(200);
      } catch(err){
         return [res.sendStatus(400), err];
      }  
   },

   async buscarTodosProdutos(req, res){
      try{
         const [produtos, _] = await sequelizeConnection.query(`
            SELECT * FROM produtos
         `);
         
         return res.send(produtos);
      } catch(err){
         return [res.sendStatus(400), err];
      }  
   },

   async buscarProduto(req, res){
      try{
         const [produtos, _] = await sequelizeConnection.query(`
            SELECT * FROM produtos WHERE id = ${req.params.id}
         `);
         return res.send(produtos);
      } catch(err){
         return [res.sendStatus(400), err];
      }  
   },
   
   async criarProduto(req, res){
      const {nome, valor_unitario, quantidade} = req.body;
      
      try{
         await sequelizeConnection.query(`
            INSERT INTO produtos VALUES
            (DEFAULT, '${nome}', ${valor_unitario}, ${quantidade})
         `);
         return res.sendStatus(200);
      } catch(err){
         return [res.sendStatus(400), err];
      }  
   },

   async deletarProduto(req,res){
      try{
         await sequelizeConnection.query(
            `DELETE FROM produtos WHERE id = ${req.params.id}`
         );
         return res.sendStatus(200);
      }catch(err){
         return [res.sendStatus(500), err]
      }
   }
}