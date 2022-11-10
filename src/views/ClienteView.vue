<!-- eslint-disable prettier/prettier -->

<template>
  <div class="centered">
    <h1><b> Clientes </b></h1>
    <ClienteTable />
  </div>
</template>

<script>
// @ is an alias to /src
import ClienteTable from "../components/ClienteTable.vue";
export default {
  name: "ClienteView",
  components: {
    ClienteTable,
  },
};
</script>

<style scoped>

</style>
