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
                    <NButton @click="addProduct" type="Primary">Añadir</NButton>
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


let tokenStr;
//verify that local storage has a token
if (localStorage.getItem("userState") == null) {
    //if not, redirect to login
    tokenStr = "";
    //redirect to login
    window.location.href = "/#/login";


} else {
    tokenStr = JSON.parse(localStorage.getItem("userState")).token;
}




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
            let url = "https://localhost:8080/api/" + this.chosenTable + "?";

            for (let key in this.formValue) {
                url += key + "=" + this.formValue[key] + "&";
            }

            //quitar el ultimo &
            url = url.slice(0, -1);

            //hacer la peticion
            axios
                .post(url, {}, { headers: { "Authorization": `Bearer ${tokenStr}` } })
                .then((response) => {
                    console.log(response);
                    this.textoRespuestaJSON = JSON.stringify(response.data.message, null, 2);// aqui se muestra la respuesta del servidor en el textarea del formulario
                }).then(() => {

                    //Actualizar la tabla del elemento padre del que este componente es
                    //hijo
                    console.log(this.$parent.$refs.dataTable);
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
            //construir la url
            let url = "https://localhost:8080/api/" + this.chosenTable + "?";
            console.log(this.formValue);
            let self = this;
            axios
                .delete("https://localhost:8080/api/productos/" + this.formValue.sku, { headers: { "Authorization": `Bearer ${tokenStr}` } })
                .then((result) => {
                    self.textoRespuestaJSON = JSON.stringify(result.data.message, null, 2);// aqui se muestra la respuesta del servidor en el textarea del formulario

                    console.log("Aqui se muestra la respuesta del servidor en el textarea del formulario");
                    self.$parent.$refs.dataTable.updateTable();
                })
                .catch((error) => {
                    console.log(error);
                    this.textoRespuestaJSON = JSON.stringify(error.data, null, 2);

                });
        },
        editProduct() {
            //construir la url para hacer la peticion tipo PUT
            let url = "https://localhost:8080/api/" + this.chosenTable + "/"
                + this.formValue.sku;
            //hacer la peticion
            axios
                .put(url, {}, { headers: { "Authorization": `Bearer ${tokenStr}` } })
                .then((response) => {
                    console.log(response);
                    this.textoRespuestaJSON = JSON.stringify(response.data.message, null, 2);// aqui se muestra la respuesta del servidor en el textarea del formulario
                }).then(() => {

                    //Actualizar la tabla del elemento padre del que este componente es
                    //hijo
                    console.log(this.$parent.$refs.dataTable);
                    this.$parent.$refs.dataTable.updateTable();
                    //this.textoRespuestaJSON = "Producto actualizado correctamente";

                })
                .catch((error) => {
                    console.log(error);
                    //this.textoRespuestaJSON = "Error al actualizar el producto";
                    this.textoRespuestaJSON = JSON.stringify(error.response.data.message, null, 2);

                });
        },

    },

    async setup(props) {
        let chosenTable = props.chosenTable;
        let tokenStr = JSON.parse(localStorage.getItem("userState")).token;
        let response = await axios.get("https://localhost:8080/api/" + chosenTable, { headers: { "Authorization": `Bearer ${tokenStr}` } });

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