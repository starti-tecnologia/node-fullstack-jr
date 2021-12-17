import PedidoService from '../../service/PedidoService'

class PedidoController {
   
  async save(req, res) {
    let response;     
    try {

      response = await PedidoService.save(req.body);
      return res.status(201).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
 
  async findAll(req, res) {
    let response;      
    try {
      response = await PedidoService.findAll();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
   
  async getById(req, res) {
    let response;      
    try {
      response = await PedidoService.getDetailsId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
   
  async update(req, res) {
    let response;      
    try {
      response = await PedidoService.update(req.params, req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
 
  async delete(req, res) {
    let response;      
    try {
      response = await PedidoService.delete(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
export default new PedidoController();
