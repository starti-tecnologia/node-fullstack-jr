import OrdenService from '../../service/OrdenService'

class OrdenController {
   
  async save(req, res) {
    let response;     
    try {

      response = await OrdenService.save(req.body);
      return res.status(201).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
 
  async findAll(req, res) {
    let response;      
    try {
      response = await OrdenService.findAll();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
   
  async getById(req, res) {
    let response;      
    try {
      response = await OrdenService.getById(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
   
  async update(req, res) {
    let response;      
    try {
      response = await OrdenService.update(req.params, req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
 
  async delete(req, res) {
    let response;      
    try {
      response = await OrdenService.delete(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
export default new OrdenController();
