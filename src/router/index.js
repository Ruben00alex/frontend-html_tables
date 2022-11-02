import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/ProductosView.vue";
import InventarioView from "../views/InventarioView.vue";
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
