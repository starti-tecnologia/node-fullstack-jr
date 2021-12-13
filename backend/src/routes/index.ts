import { Router } from 'express'
import * as produtosController from '../controllers/produtos';
import * as pedidosComprasController from '../controllers/pedidosCompra';

const router = Router();

router.get('/crudprodutos', produtosController.produtos);
router.post('/cadastroProduto', produtosController.adicionaProduto);
router.delete('/deletaProduto', produtosController.deletaProduto);
router.put('/atualizaProduto', produtosController.atualizaProduto);
router.get('/crudpedidos', pedidosComprasController.pedidos);
router.post('/cadastroPedido', pedidosComprasController.adicionaPedido);
router.delete('/deletaPedido', pedidosComprasController.deletaPedido);
router.put('/atualizaPedido', pedidosComprasController.atualizaPedido);

export default router;