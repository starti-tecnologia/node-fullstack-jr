import Orden from "../app/models/Orden";
import Product from "../app/models/Product";
import httpStatus from 'http-status-codes'

export default  {
   
  async save(req, res) {
    try {
      const create = await Orden.create(req)

      return create;
    } catch (error) {
      throw new Error(error)
    }
  }, 
   
  async findAll(req, res) {
    try {
      const orden = await Orden.findAll({
        order: [['createdAt', 'ASC']],
        include: [
          {
            model: Product,
            as: 'product',
            order: [['createdAt', 'ASC']],
            separate: true,
            attributes: [ 'id', 'name', 'valor', 'quantidade' ],
          },
        ],
      });

      return orden;
    } catch (error) {
      throw new Error(error)
    }
  },
   
  async getById(req, res) {
    try {
      let orden = await Orden.findByPk(req.id, {
        include: [
          {
            model: Product,
            as: 'product',
            order: [['createdAt', 'ASC']],
            separate: true,
            attributes: [ 'id', 'name', 'valor', 'quantidade' ],
          },
        ],
      });

      return orden;
    } catch (error) {
      throw new Error(error)
    }
  },
   
  async update(req, res){
    try {
      const orden = await Orden.findByPk(req.id);

      await orden.update(res.body);

      return orden;
    } catch (error) {
      throw new Error(error)
    }
  },
   
  async delete(req, res) {
    let result = {}
    let id = req.id

    try {
      const orden = await Orden.destroy({
        where: {
          id: id,
        },
      });

      if (!orden) {
        return res.status(400).json({ message: 'Orden not found' });
      }

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: orden}      
      return result
    } catch (error) {       
      throw new Error(error)
    }
  },
}