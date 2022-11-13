<template>
  <div class="centered">
    <div class="top-container">
      <div class="">
        <h1><b> Productos </b></h1>
        <div v-if="loading">
          <NSpin :show="loading" ref="tablaSpinner" />
        </div>
        <div v-else>
          <DatabaseTable ref="dataTable" chosenTable="productos" />

        </div>
      </div>
      <div id="columnaDerecha">
        <!-- <div class="" id="editarProducto">
          <h1><b> Editar producto </b></h1>
          <div id="productForm">
            <div id="tablaColumn">
              <NForm :model="form" :rules="rules" ref="formRef">
                <NFormItem id="sku" label="SKU">
                  <NInput v-model:value="formValue.sku" />
                </NFormItem>
                <NFormItem id="descripcion" label="Descripcion" prop="descripcion">
                  <NInput v-model:value="formValue.descripcion" />
                </NFormItem>
                <NFormItem label="Unidad" prop="unidad">
                  <NInput v-model:value="formValue.unidad" />
                </NFormItem>
                <NFormItem label="Costo" prop="costo">
                  <NInput v-model:value="formValue.costo" />
                </NFormItem>
                <NFormItem label="Precio" prop="precio">
                  <NInput v-model:value="formValue.precio" />
                </NFormItem>
              </NForm>
            </div>
            <div id="productFormRight">
              <div id="botones">
                <NButton @click="addProduct" type="Primary">Actualizar</NButton>
                <NButton @click="deleteProduct" type="error">Eliminar</NButton>
                <NButton @click="editProduct" type="tertiary">Editar</NButton>

              </div>
            </div>

          </div>
        </div> -->
        <Suspense>
          <EditTable ref="editTable" chosenTable="productos" />
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import DatabaseTable from "../components/DatabaseTable.vue";
import { NInput } from "naive-ui";
import { NButton } from "naive-ui";
import { NForm } from "naive-ui";
import { NFormItem } from "naive-ui";
import { NSpin } from "naive-ui";
import { defineComponent, ref } from "vue";
import { useMessage } from "naive-ui";
import axios from "axios";
import EditTable from "../components/EditTable.vue";

export default {
  name: "ProductosView",
  components: {
    DatabaseTable,

    EditTable,
    NButton,
    NInput,
    NForm,
    NFormItem,
    NSpin,
  },


  methods: {
    addProduct() {
      //construir la url
      let url = "http://localhost:8080/api/productos?";

      for (let key in this.formValue) {
        url += key + "=" + this.formValue[key] + "&";
      }

      //quitar el ultimo &
      url = url.slice(0, -1);

      //hacer la peticion
      axios
        .post(url)
        .then((response) => {
          console.log(response);
        }).then(() => {

          this.$refs.dataTable.updateTable();

        })
        .catch((error) => {
          console.log(error);
        });


    },
    deleteProduct() {
      axios
        .delete("http://localhost:8080/api/productos/" + this.formValue.id)
        .then((result) => {
          this.message.success("Producto eliminado");
        })
        .catch((error) => {
          this.message.error("Error al eliminar producto");
        });
    },
    editProduct() {
      axios
        .get("http://localhost:8080/api/productos/" + this.formValue.id)
        .then((result) => {
          this.formValue.descripcion = result.data.descripcion;
          this.formValue.unidad = result.data.unidad;
          this.formValue.costo = result.data.costo;
          this.formValue.precio = result.data.precio;
        })
        .catch((error) => {
          this.message.error("Error al editar producto");
        });
    },

  },
  props: {

    msg: String,
    precio: Number,
    costo: Number,
    unidad: Number,
    descripcion: String,

  },
  setup() {
    const formRef = ref(null);
    //take a json and turn into formValue

    return {
      formRef,
      size: ref("medium"),
      formValue: ref({
        descripcion: "",
        unidad: "",
        costo: "",
        precio: "",


      }),
      rules: {

        descripcion: [
          {

            required: true,
            message: "Descripcion es requerida",
          },
        ],
        unidad: [
          {
            required: true,
            message: "Unidad es requerida",
          },
        ],
        costo: [
          {
            required: true,
            message: "Costo es requerido",
          },
        ],
        precio: [
          {
            required: true,
            message: "Precio es requerido",
          },
        ],

      },
    };
  },


  updateProduct() {
    console.log("updateProduct");
    console.log(descripcion);
  },

  created() {
    this.loading = false;
  },
  data() {
    return {
      loading: true,
      form: {
        descripcion: "",
        unidad: "",
        costo: "",
        precio: "",
      },
    };
  },
};



function data() {
  return {
    loading: true,
    descripcion: "",
    precio: "",
    cantidad: "",
    unidad: "",
    costo: "",
  };
};




</script>

<style scoped>
/* make elements with class centered and with id = "editarProducto" to be */
#productForm {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  column-gap: 1rem;

  height: 100%;
  background-color: #7FFFD4;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);

}



#botones {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  align-items: center;

}

#botones .n-button {
  margin: 2rem;
}


.top-container {
  /* div with 2 columns, the first is 2/3 and 2nd is 1/3*/
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  column-gap: 4rem;
  row-gap: 1rem;
  padding: 1rem;
  height: 100%;
  width: fit-content;

}

#columnaDerecha {
  /*align content vertically*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: fit-content;
  width: fit-content;
  align-items: center;



}

/*change top-container to be 2 rows and 1 column when screen width is less than 800px*/
@media screen and (max-width: 800px) {
  .top-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    column-gap: 1rem;
    row-gap: 2rem;
    padding: 1rem;
    height: 100%;
    width: fit-content;
    height: fit-content;
  }
}
</style>