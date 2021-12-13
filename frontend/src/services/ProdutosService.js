import apiClient from "./ConnectionService"

const produtosController = {
    criarProduto(produto){
        return apiClient.post('/produtos', produto);
    },

    editarProduto(id, produto){
        return apiClient.put(`/produtos/${id}`, produto);
    },

    buscarProduto(id){
        return apiClient.get(`/produtos/${id}`);
    },

    buscarTodosProdutos(){
        return apiClient.get(`/produtos`);
    },

    deletarProduto(id){
        return apiClient.delete(`/produtos/${id}`);
    }
}

export default produtosController;