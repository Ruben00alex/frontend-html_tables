<template>
  <div class="centered">
    <h1><b> Productos </b></h1>
    <NSpin :show="loading" />
    <ProductosTable />
  </div>
  <div class="centered">

    <h1><b> Agregar producto </b></h1>
    <div class="">

      <NButton @click="addProduct" type="Primary">Agregar</NButton>
    </div>

  </div>
  <div class="centered" id="editarProducto">
    <h1><b> Editar producto </b></h1>
    <div id="productForm">
      <NForm :model="form" :rules="rules" inline>
        <NFormItem id="descripcion" label="Descripcion" prop="descripcion">
          <NInput />
        </NFormItem>
        <NFormItem label="SKU" prop="sku">
          <NInput />
        </NFormItem>
        <NFormItem label="Unidad" prop="unidad">
          <NInput />
        </NFormItem>
        <NFormItem label="Costo" prop="costo">
          <NInput />
        </NFormItem>
      </NForm>
      <div id="botones">
        <NButton @click="updateProduct" type="Primary">Actualizar</NButton>
        <NButton @click="deleteProduct" type="error">Eliminar</NButton>
        <NButton @click="editProduct" type="tertiary">Editar</NButton>

      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductosTable from "@/components/ProductosTable.vue";
import InventarioTable from "@/components/InventarioTable.vue";
import { NInput } from "naive-ui";
import { NButton } from "naive-ui";
import { NForm } from "naive-ui";
import { NFormItem } from "naive-ui";
import { NSpin } from "naive-ui";

export default {
  name: "ProductosView",
  components: {
    ProductosTable,
    InventarioTable,
    NButton,
    NInput,
    NForm,
    NFormItem,
    NSpin,
  },
};
function data() {
  return {
    descripcion: "",
    precio: "",
    cantidad: "",
  };
};
data: data;

methods: {
  function addProduct() {
    console.log("addProduct");
    let descripcion = document.getElementById("descripcion").value;
    console.log(descripcion);
  }
};
</script>

<style scoped>
/* make elements with class centered and with id = "editarProducto" to be next to each other instead of one below the other */
#productForm {
  display: inline-block;
  margin: 0 3rem;
  background-color: #7860ff;
  padding: 1rem;
  border-radius: 0 0 1rem 1rem;
  width: fit-content;

}

#operacionesHTTP {
  display: inline-block;
  width: fit-content;
}

.n-form-item {
  margin: 0.5rem;
}

#botones {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  right: 40%;
  transform: translateX(10%);
}

#top-container {
  /* div with 2 columns, the first is 2/3 and 2nd is 1/3*/
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
  padding: 1rem;

}
</style>