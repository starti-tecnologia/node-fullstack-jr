import ProductService from '../../service/ProductService'

class ProductController {
   
  async save(req, res) {
    let response;     
    try {
      response = await ProductService.save(req.body);
      return res.status(201).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
   
  async findAll(req, res) {
    let response;      
    try {
      response = await ProductService.getFindAll();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
   
  async getById(req, res) {
    let response;      
    try {
      response = await ProductService.getById(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  
  async update(req, res) {
    let response;      
    try {
      response = await ProductService.update(req.params, req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
   
  async delete(req, res) {
    let response;      
    try {
      response = await ProductService.delete(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new ProductController();
