import { createRouter, createWebHistory } from 'vue-router';
import Pedidos from '../views/Pedidos.vue';
import Produtos from '../views/Produtos.vue';

const routes = [
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: Pedidos
  },
  {
    path: '/produtos',
    name: 'Produtos',
    component: Produtos
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
