const router = require('express').Router()

const produtoController = require('./controllers/produtoController')
const pedidoController = require('./controllers/pedidoController')

router.get('/produtos', produtoController.buscarTodosProdutos)

router.get('/produto/:id', produtoController.buscarProduto)

router.post('/novoProduto', produtoController.criarProduto)

router.put('/produto/:id', produtoController.editarProduto)

router.delete('/produto/:id', produtoController.deletarProduto)


router.get('/pedidos', pedidoController.buscarTodosPedidos)

router.get('/pedido/:id', pedidoController.buscarPedido)

router.post('/novoPedido', pedidoController.criarPedido)

router.put('/pedido/:id', pedidoController.editarPedido)

router.delete('/pedido/:id', pedidoController.deletarPedido)

module.exports = router