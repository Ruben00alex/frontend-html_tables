<!-- eslint-disable prettier/prettier -->

<template>
  <div class="centered">
    <h1><b> Inventario </b></h1>
    <DatabaseTable chosenTable="inventario" />
  </div>
</template>

<script>
// @ is an alias to /src
import DatabaseTable from "../components/DatabaseTable.vue";
export default {
  name: "InventarioView",
  components: {
    DatabaseTable,
  },
};
</script>

<style scoped>

</style>
