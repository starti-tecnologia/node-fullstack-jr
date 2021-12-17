import ProdutoService from '../../service/ProdutoService'

class ProdutoController {
   
  async save(req, res) {
    let response;     
    try {
      response = await ProdutoService.save(req.body);
      return res.status(201).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
   
  async findAll(req, res) {
    let response;      
    try {
      response = await ProdutoService.findAll(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
   
  async getById(req, res) {
    let response;      
    try {
      response = await ProdutoService.getById(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  
  async update(req, res) {
    let response;      
    try {
      response = await ProdutoService.update(req.params, req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
   
  async delete(req, res) {
    let response;      
    try {
      response = await ProdutoService.delete(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new ProdutoController();
