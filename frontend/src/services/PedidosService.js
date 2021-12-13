import apiClient from "./ConnectionService"

const pedidosController = {
    criarPedido(pedido){
        return apiClient.post('/pedidos', pedido);
    },

    editarPedido(id, pedido){
        return apiClient.put(`/pedidos/${id}`, pedido);
    },

    buscarPedido(id){
        return apiClient.get(`/pedidos/${id}`);
    },

    buscarTodosPedidos(){
        return apiClient.get(`/pedidos`);
    },

    deletarPedido(id){
        return apiClient.delete(`/pedidos/${id}`);
    }
}

export default pedidosController;