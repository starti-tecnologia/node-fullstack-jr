import { Request, Response } from 'express';
import { Produtos } from '../models/Produtos';

const produtos = async (req: Request, res: Response)=>{
    let produtos = await Produtos.findAll({
        attributes: ['id', 'nome', 'valor_unitario', 'quantidade'],
        raw: true,
        nest: true
    });
    res.json(produtos)
}

const adicionaProduto = async (req: Request, res: Response) => {
    let novoProd = Produtos.build({
        nome: req.query.nome,
        valor_unitario: req.query.valor_unitario,
        quantidade: req.query.quantidade
    })
    await novoProd.save();
    res.send({novoProd});
}

const deletaProduto = async (req: Request, res: Response) => {
    await Produtos.destroy({
        where: {
            id: req.query.id
        }
    })
    res.send();
}

const atualizaProduto = async (req: Request, res: Response) => {
    let prodAtualizado = await Produtos.update({
        nome: req.query.nome,
        valor_unitario: req.query.valor_unitario,
        quantidade: req.query.quantidade
    },{
        where: { id: req.query.id }
    })
    res.send({prodAtualizado});
}

export {produtos, adicionaProduto, deletaProduto, atualizaProduto};