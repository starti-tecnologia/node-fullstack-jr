import { Router } from 'express';

import PedidoController from './app/controller/PedidoController';
import ProdutoController from './app/controller/ProdutoController';

const router = new Router();
 
  router
    .route('/pedido')
    .post(PedidoController.save)
    .get(PedidoController.findAll);

  router
    .route('/pedido/:id')
    .put(PedidoController.update)
    .get(PedidoController.getById)
    .delete(PedidoController.delete);

  router
    .route('/produto')
    .post(ProdutoController.save)
    .get(ProdutoController.findAll);

  router
    .route('/produto/:id')
    .put(ProdutoController.update)
    .get(ProdutoController.getById)
    .delete(ProdutoController.delete);  

export default router;
