import React from 'react';
import Icone from '../icone/Icone';
import './TablePedidos.css';

export default props => {
    const checkStatus = (status) => {
        if(status === 'Pago' || status === 'Cancelado'){
            return "disabled";
        } else {
            return "";
        }
    }
    const renderRows = () => {
        const list = props.list || [];
        return list.map(pedido => (
            <tr key={pedido.id_pedido}>
                <td>{pedido.nomeCliente}</td>
                <td>{pedido.numeroPedido}</td>
                <td>{pedido.email}</td>
                <td>{pedido.produtos}</td>
                <td>{pedido.status}</td>
                <td className='d-flex'>
                    <Icone estilo="danger col" icone="trash" onClick={() => props.delete(pedido)}></Icone>
                    <Icone estilo={"primary col "+ checkStatus(pedido.status)} icone="pencil" onClick={() => props.update(pedido)}></Icone>
                </td>
            </tr>
        ))
    }
    
    return(
        <div>
            <table id="tabelaprod" className="table table-striped">
                <thead>
                    <tr>
                        <th className="col-3">Nome do Cliente</th>
                        <th className="col-2">Número do Pedido</th>
                        <th className="col-2">Email</th>
                        <th className="col-2">Produtos</th>
                        <th className="col-2">Status</th>
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