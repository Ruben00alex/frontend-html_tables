<template>
    <div class="" id="editarProducto">
        <h1><b> Editar producto </b></h1>
        <div id="productForm">
            <div id="tablaColumn">
                <NForm :model="form" :rules="rules" ref="formRef">
                    <!-- dynamically generated <NFormItem> with <NInputs >inside, they will take the value from -->
                    <!-- the formValue object -->
                    <NFormItem v-for="item in formValue" :key="item.label" :label="item.value" :prop="item.prop">
                        <NInput v-model:value="formValue[item.prop]" />
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
    </div>
</template>

<script>
// @ is an alias to /src
import { NInput } from "naive-ui";
import { NButton } from "naive-ui";
import { NForm } from "naive-ui";
import { NFormItem } from "naive-ui";
import { NSpin } from "naive-ui";
import { defineComponent, ref } from "vue";
import { useMessage } from "naive-ui";
import axios from "axios";

export default {


    name: "EditTable",
    components: {
        NButton,
        NInput,
        NForm,
        NFormItem,
        NSpin,
    },


    props: ["chosenTable"],
    methods: {



        addProduct() {
            //construir la url
            let url = "http://localhost:8080/api/" + this.chosenTable + "?";

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

                    //Actualizar la tabla del elemento padre del que este componente es
                    //hijo
                    this.$parent.$refs.dataTable.updateTable();

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

    async setup(props) {
        let chosenTable = props.chosenTable;

        let response = await axios.get("http://localhost:8080/api/" + chosenTable);

        let result = response.data;

        console.log(result[0]);

        // Create a reactive object
        let formValue = ref({});
        let form = ref({});
        let rules = ref({});

        // Create a reactive object
        for (let key in result[0]) {
            formValue.value[key] = "";
            form.value[key] = "";
            rules.value[key] = [{ required: true, message: "Campo requerido" }];
        }


        // console.log(propsN);
        // //make a empty object to store the form 





        const formRef = ref(null);
        const formJSON = {
            costo
                :
                "",
            descripcion
                :
                "",
            id
                :
                "",
            precio
                :
                "",
            sku
                :
                "",
            unidad
                :
                "",
        }
        console.log(formJSON);
        //make a new variable with the format of formJSON , but with the values of propsN so that it's generic



        return {
            formRef,
            size: ref("medium"),//ref() is a function that returns a reactive object, a reactive object is a object that can be used in the template for example <NButton :size="size" />
            formValue: ref(formValue),
            rules,
            handleValidateClick(e) {
                e.preventDefault();
                formRef.value?.validate((errors) => {
                    if (!errors) {
                    } else {
                        console.log(errors);
                    }
                });
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
    mounted() {
        this.loading = false;
        console.log("mounted");
        console.log(this)

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
    column-gap: 2rem;
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
        row-gap: 3rem;
        padding: 1rem;
        height: 100%;
        width: fit-content;
    }
}
</style>