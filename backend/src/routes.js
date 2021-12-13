const router = require('express').Router()

const produtoController = require('./controllers/produtoController')
const pedidoController = require('./controllers/pedidoController')

router.get('/produtos', produtoController.buscarTodosProdutos)

router.get('/produtos/:id', produtoController.buscarProduto)

router.post('/produtos', produtoController.criarProduto)

router.put('/produtos/:id', produtoController.editarProduto)

router.delete('/produtos/:id', produtoController.deletarProduto)


router.get('/pedidos', pedidoController.buscarTodosPedidos)

router.get('/pedidos/:id', pedidoController.buscarPedido)

router.post('/pedidos', pedidoController.criarPedido)

router.put('/pedidos/:id', pedidoController.editarPedido)

router.delete('/pedidos/:id', pedidoController.deletarPedido)

module.exports = router