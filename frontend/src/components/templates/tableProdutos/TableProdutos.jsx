import React from 'react';
import Icone from '../icone/Icone';
import './TableProdutos.css';

export default props => {
    const renderRows = () => {
        const list = props.list || [];
        return list.map(produto => (
            <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>R${produto.valor_unitario}</td>
                <td>{produto.quantidade}</td>
                <td className='d-flex'>
                    <Icone estilo="danger col" icone="trash" onClick={() => props.delete(produto)}></Icone>
                    <Icone estilo="primary col" icone="pencil" onClick={() => props.update(produto)}></Icone>
                </td>
            </tr>
        ))
    }
    
    return(
        <div>
            <table id="tabelaprod" className="table table-striped">
                <thead>
                    <tr>
                        <th className="col-5">Nome</th>
                        <th className="col-3">Valor Unitário</th>
                        <th className="col-3">Quantidade</th>
                        <th className='col-1'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    )
}