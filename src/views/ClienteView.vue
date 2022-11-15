<!-- eslint-disable prettier/prettier -->

<template>
  <TablePage chosenTable="clientes" />
</template>

<script>
// @ is an alias to /src
import DatabaseTable from "../components/DatabaseTable.vue";
import EditTable from "../components/EditTable.vue";
import TablePage from "../components/TablePage.vue";
import { NSpin } from "naive-ui";


export default {
  name: "ClienteView",
  components: {
    DatabaseTable,
    NSpin,
    EditTable,
    TablePage,
  },
  created() {
    document.title = 'Cliente'
  }
};
</script>

<style scoped>

</style>
