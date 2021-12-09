const router = require('express').Router()

const produtoController = require('./controllers/produtoController')

router.get('/produtos', produtoController.buscarTodosProdutos)

router.get('/produto/:id', produtoController.buscarProduto)

router.post('/novoProduto', produtoController.criarProduto)

router.put('/produtos/:id', produtoController.editarProduto)

module.exports = router