import Produto from "../app/models/Produto";
import httpStatus from 'http-status-codes';

export default {
  
  async save(req, res) {
    let { name, valor, quantidade } = req;
    
    try {
      const produto = await Produto.create({ name, valor, quantidade });
     
      return produto;
    } catch (error) {
      throw new Error(error)
    }
  },
   
  async findAll(req, res) {
    let id = req.pedidos_id;
    try {
      const produto = await Produto.findAndCountAll({
        where: { pedidos_id: id },
        order: [['id', 'ASC']],
      });

      const pedidos = await Produto.findAll({ where: { pedidos_id: id } });

      const valid = pedidos.filter(function (result) {
        return result.dataValues;
      });

      const venci = valid.map(function (result) {
        const valor = parseInt(result.dataValues.valor);

        return valor;
      });

      const total = venci.reduce((acumulado, x) => {
        return acumulado + x;
      });
      return {produto, total};
    } catch (error) {
      throw new Error(error)
    }
  },

  async getById(req, res) {
    let id = req.id;

    try {
      let produto = await Produto.findByPk(id);

      return produto;
    } catch (error) {
      throw new Error(error)
    }
  },
   
  async update(req, res) {
    let id = req.id;
    let body = res
   
    try {
      const produto = await Produto.findByPk(id);

      await produto.update(body);

      return produto;
    } catch (error) {
      throw new Error(error)
    }
  },
  
  async delete(req, res) {
    let id = req.id;
    let result = {}

    try { 
      const produto = await Produto.destroy({
        where: {
          id: id,
        },
      });

      if (!produto) {
        return res.status(400).json({ message: 'Produto not found' });
      }

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: produto}      
      return result;
    } catch (error) {
      throw new Error(error)
    }
  }
}