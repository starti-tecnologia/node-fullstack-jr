import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/products",
      name: "products",
      component: () => import("./components/ProductsList")
    },
    {
      path:"/orders",
      name:"orders",
      component: () => import("./components/OrderList")
    },
    {
      path: "/products/:id",
      name: "product-details",
      component: () => import("./components/Product")
    },
    {
      path:"/orders/:id",
      name:"order-details",
      component: () => import("./components/Order")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddProduct")
    },
    {
      path:"/addorder",
      name:"addorder",
      component: () => import("./components/AddOrder")
    },
  ]
});