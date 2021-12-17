import Pedido from "../app/models/Pedido";
import Produto from "../app/models/Produto";
import httpStatus from 'http-status-codes'

export default  {
   
  async save(req, res) {
    let pedido = req
    try {
      const create = await Pedido.create(pedido)

      return create;
    } catch (error) {
      throw new Error(error)
    }
  }, 
   
  async findAll(req, res) {
    try {
      const pedido = await Pedido.findAll({
        order: [['createdAt', 'ASC']],
        include: [
          {
            model: Produto,
            as: 'produto',
            order: [['createdAt', 'ASC']],
            separate: true,
            attributes: [ 'id', 'name', 'valor', 'quantidade' ],
          },
        ],
      });

      return pedido;
    } catch (error) {
      throw new Error(error)
    }
  },
   
  async getById(req, res) {
    let id = req.id
    try {

      let pedido = await Pedido.findByPk(id, {
        include: [
          {
            model: Produto,
            as: 'produto',
            order: [['createdAt', 'ASC']],
            separate: true,
            attributes: [ 'id', 'name', 'valor', 'quantidade' ],
          },
        ],
      });

      return pedido;
    } catch (error) {
      throw new Error(error)
    }
  },
   
  async update(req, res){
    let id = req.id
    let body = res
    
    try {
      const pedido = await Pedido.findByPk(id);

      await pedido.update(body);

      return pedido;
    } catch (error) {
      throw new Error(error)
    }
  },
   
  async delete(req, res) {
    let result = {}
    let id = req.id
    try {
      const pedido = await Pedido.destroy({
        where: {
          id: id,
        },
      });

      if (!pedido) {
        return res.status(400).json({ message: 'Pedido not found' });
      }

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: pedido}      
      return result
    } catch (error) {       
      throw new Error(error)
    }
  },
}