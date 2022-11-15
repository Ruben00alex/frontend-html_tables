<!-- eslint-disable prettier/prettier -->

<template>

  <TablePage chosenTable="inventario" />
</template>

<script>
// @ is an alias to /src

import { NSpin } from "naive-ui";

import TablePage from "../components/TablePage.vue";
export default {
  name: "InventarioView",
  components: {

    NSpin,
    TablePage,

  },
  created() {

    document.title = 'Inventario'
  }

};


</script>

<style scoped>
@import "../styles/View.css";
</style>
