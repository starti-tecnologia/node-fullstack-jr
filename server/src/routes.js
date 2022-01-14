import { Router } from 'express';

import OrdenController from './app/controller/OrdenController';
import ProductController from './app/controller/ProductController';

const router = new Router();
 
  router
    .route('/orden')
    .post(OrdenController.save)
    .get(OrdenController.findAll);

  router
    .route('/orden/:id')
    .put(OrdenController.update)
    .get(OrdenController.getById)
    .delete(OrdenController.delete);

  router
    .route('/product')
    .post(ProductController.save)
    .get(ProductController.findAll);

  router
    .route('/product/:id')
    .put(ProductController.update)
    .get(ProductController.getById)
    .delete(ProductController.delete);  

export default router;
