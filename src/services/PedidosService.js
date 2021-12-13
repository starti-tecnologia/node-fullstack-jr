import apiClient from "./ConnectionService"

const pedidosController = {
    criarPedido(pedido){
        return apiClient.post('/pedidos', pedido);
    },

    editarPedido(id, pedido){
        return apiClient.put(`/pedido/${id}`, pedido);
    },

    buscarPedido(id){
        return apiClient.get(`/pedido/${id}`);
    },

    buscarTodosPedidos(){
        return apiClient.get(`/pedidos`);
    },

    deletarPedido(id){
        console.log('/pedido/'+id)
        return apiClient.delete(`/pedido/${id}`);
    }
}

export default pedidosController;