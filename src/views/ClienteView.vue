<!-- eslint-disable prettier/prettier -->

<template>
  <div class="centered">
    <h1><b> Clientes </b></h1>
    <DatabaseTable chosenTable="clientes" />
  </div>
</template>

<script>
// @ is an alias to /src
import DatabaseTable from "../components/DatabaseTable.vue";
export default {
  name: "ClienteView",
  components: {
    DatabaseTable,
  },
};
</script>

<style scoped>

</style>
