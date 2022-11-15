<template>
    <div class="" id="editarProducto">
        <h1><b> Editar producto </b></h1>
        <div id="productForm">
            <div id="tablaColumn">
                <NForm :model="form" :rules="rules" ref="formRef">
                    <!-- dynamically generated <NFormItem> with <NInputs >inside, they will take the value from -->
                    <!-- the formValue object -->
                    <NFormItem v-for="(value, key) in formValue" :key="key" :label="key">
                        <NInput v-model:value="formValue[key]" />
                    </NFormItem>
                </NForm>
            </div>
            <div id="productFormRight">
                <div id="botones">
                    <NButton @click="addProduct" type="Primary">Actualizar</NButton>
                    <NButton @click="deleteProduct" type="error">Eliminar</NButton>
                    <NButton @click="editProduct" type="tertiary">Editar</NButton>
                </div>
                <div class="displayTextArea">
                    <!-- NInput textarea dark with no text and 100% height -->
                    <!-- <NInput id="inputTextArea" type="textarea" v-model:value="textoRespuestaJSON" :disabled="true"
                        placeholder="Respuesta del servidor" /> -->
                    <p>{{ textoRespuestaJSON }}</p>

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
                    this.textoRespuestaJSON = JSON.stringify(response.data.message, null, 2);// aqui se muestra la respuesta del servidor en el textarea del formulario
                }).then(() => {

                    //Actualizar la tabla del elemento padre del que este componente es
                    //hijo
                    this.$parent.$refs.dataTable.updateTable();
                    //this.textoRespuestaJSON = "Producto actualizado correctamente";

                })
                .catch((error) => {
                    console.log(error);
                    //this.textoRespuestaJSON = "Error al actualizar el producto";
                    this.textoRespuestaJSON = JSON.stringify(error.response.data.message, null, 2);

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
            textoRespuestaJSON: ref("Respuesta del servidor."),
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

        };
    },
};







</script>

<style scoped>
#botones {
    display: flex;
    flex-direction: column;

    height: fit-content;

    align-items: center;

}

#botones button {
    margin: 0.625rem;
}

/* 2nd element inside of #botones will have top margin auto */
#botones button:nth-child(3) {
    margin-bottom: auto;
}

#productFormRight {
    /* grid with 2 rows and 1 column */
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr;

    row-gap: 1rem;
    /* 1st element will have top margin auto */


}

.displayTextArea>* {
    height: 100%;
    margin: auto 0;

}

.displayTextArea {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.displayTextArea p {
    margin: auto 0;
    height: 100%;
    width: 25ch;
}

.inputTextArea {
    height: 100%;
    width: 100%;
    background-color: #000;
}
</style>