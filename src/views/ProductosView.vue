<template>
  <div class="centered">
    <h1><b> Productos </b></h1>
    <ProductosTable />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductosTable from "@/components/ProductosTable.vue";

export default {
  name: "ProductosView",
  components: {
    ProductosTable,
  },
};
</script>
