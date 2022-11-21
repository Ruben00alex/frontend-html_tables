import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import InventarioView from "../views/InventarioView.vue";
import ClienteView from "../views/ClienteView.vue";
import CarritoView from "../views/CarritoView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/productos",
    name: "productos",
    component: function () {
      return import("../views/ProductosView.vue");
    },
  },
  {
    path: "/inventario",
    name: "inventario",
    component: InventarioView,
  },
  {
    path: "/clientes",
    name: "clientes",
    component: ClienteView,
  },
  //carrito:
  {
    path: "/carrito",
    name: "carrito",
    component: CarritoView,
  },
  //Login:
  {
    path: "/login",
    name: "login",
    component: function () {
      return import("../views/LoginView.vue");
    },
  },
  //signin:
  {
    path: "/signin",
    name: "signin",
    component: function () {
      return import("../views/SigninView.vue");
    },
  },

  //tabla:
  {
    path: "/tabla",
    name: "tabla",
    component: function () {
      return import("../views/TablaView.vue");
    },
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
