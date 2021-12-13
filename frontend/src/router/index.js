import Vue from 'vue';
import VueRouter from 'vue-router';
import Pedidos from '../views/pedidos/Pedidos.vue';
import Produtos from '../views/Produtos.vue';
import NovoPedido from '../views/pedidos/NovoPedido.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Produtos',
    component: Produtos
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: Pedidos
  },
  {
    path: '/novopedido/:id/:isEdit',
    name: 'NovoPedido',
    component: NovoPedido, 
    // props: {id: '', isEdit: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
