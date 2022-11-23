<template>
  <TablePage chosenTable="productos" />
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
import TablePage from "../components/TablePage.vue";

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
    TablePage,
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
    document.title = 'Productos'
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
</style>