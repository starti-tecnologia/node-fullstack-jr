import { Request, Response } from 'express';
import { PedidosCompra } from '../models/PedidosCompra';

const pedidos = async (req: Request, res: Response)=>{
    let pedidos = await PedidosCompra.findAll({
        attributes: ['id_pedido', 'nomeCliente', 'numeroPedido', 'email', 'produtos', 'status'],
        raw: true,
        nest: true
    });
    res.json(pedidos)
}

const adicionaPedido = async (req: Request, res: Response) => {
    let novoPedido = PedidosCompra.build({
        nomeCliente: req.query.nomeCliente,
        numeroPedido: req.query.numeroPedido,
        email: req.query.email,
        produtos: req.query.produtos,
        status: req.query.status
    })
    await novoPedido.save();
    res.send({novoPedido});
}

const deletaPedido = async (req: Request, res: Response) => {
    await PedidosCompra.destroy({
        where: {
            id_pedido: req.query.id_pedido
        }
    })
    res.send();
}

const atualizaPedido = async (req: Request, res: Response) => {
    let pedidoAtualizado = await PedidosCompra.update({
        nomeCliente: req.query.nomeCliente,
        numeroPedido: req.query.numeroPedido,
        email: req.query.email,
        produtos: req.query.produtos,
        status: req.query.status
    },{
        where: { id_pedido: req.query.id_pedido }
    })
    res.send({pedidoAtualizado});
}

export {pedidos, adicionaPedido, deletaPedido, atualizaPedido};