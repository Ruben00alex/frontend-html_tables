import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import InventarioView from "../views/InventarioView.vue";
import ClienteView from "../views/ClienteView.vue";
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
