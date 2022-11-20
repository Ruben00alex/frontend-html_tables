
<template>
    <div id="tablaProductos">
    </div>

</template>



<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { NSpin } from "naive-ui";
const loading = ref(true);
let chosenTable = props.chosenTable;

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

//in defineExpose, we can define the methods that we want to expose to the parent component
defineExpose({
    loading,
    chosenTable,
    updateTable,
});


const props = defineProps({
    chosenTable: {
        type: String,
        required: true,
    }
});//props is an object that contains all the props that we defined in defineProps

onMounted(() => {
    loading.value = false;
    console.log(chosenTable);

    createTable();
    console.log("Table created");
});//onMounted is a lifecycle hook that is called when the component is mounted

//Funcion para actualizar la tabla
function updateTable() {
    console.log("Updating table");
    let url = "https://localhost:8080/api/";
    url += chosenTable;
    axios.get(url, { headers: { "Authorization": `Bearer ${tokenStr}` } }).then((result) => {
        let datosProductos = result.data;

        let tablaProductos = document.getElementById("tablaProductos"); //obtener la referencia a la tabla

        //tabla es un elemento creado de tipo table dentro de tablaProductos
        let tabla = tablaProductos.children[0];
        //limpiar la tabla
        tabla.innerHTML = "";


        let thead = document.createElement("thead");
        let tr = document.createElement("tr");


        //get datosProductos propsNames:
        let propsNames = Object.getOwnPropertyNames(datosProductos[0]);
        console.log(propsNames);

        //crear table header
        propsNames.forEach((propName) => {
            let th = document.createElement("th");
            th.innerHTML = propName;
            tr.appendChild(th);
        });

        thead.appendChild(tr);
        tabla.appendChild(thead);


        //add data from datosProductos to tabla
        datosProductos.forEach((producto) => {
            let row = tabla.insertRow();

            for (let i = 0; i < propsNames.length; i++) {
                let cell = row.insertCell();
                cell.innerHTML = producto[propsNames[i]];
            }
        });
    });

}

//Funcion para crear la tabla
function createTable() {

    let url = "https://localhost:8080/api/";
    url += chosenTable;
    //send get request to url with an authorization header
    console.log("url:" + url);
    console.log(tokenStr);

    axios.get(url, { headers: { "Authorization": `Bearer ${tokenStr}` } }).then((result) => {
        let datosProductos = result.data;
        //Aqui se crea la tabla
        let tablaProductos = document.getElementById("tablaProductos");
        let tabla = document.createElement("table");
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");


        let propsNames = Object.getOwnPropertyNames(datosProductos[0]);
        console.log(propsNames);

        //create table header
        propsNames.forEach((propName) => {
            let th = document.createElement("th");
            th.innerHTML = propName;
            tr.appendChild(th);
        });

        thead.appendChild(tr);
        tabla.appendChild(thead);
        tablaProductos.appendChild(tabla);
        //add data from datosProductos to table
        updateTable();
    }

    )


}




</script>


  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
table,
th,
td {
    padding: 10px;
    text-align: center;

}

tr:last-of-type {
    border-bottom: 2px solid hsl(172, 100%, 30%);
}

table {

    border-collapse: collapse;
    margin: 0 auto;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 10px 10px 20px hsla(257, 100%, 18%, 0.531);

    width: fit-content;
    font-family: 'Roboto', sans-serif;
}

td {

    font-size: 1.2em;

    padding: 12px 15px;
    text-align: center;
    max-width: 30ch;
    overflow: hidden;
    text-overflow: wrap;


}

td:first-child {
    max-width: 25ch;

}

/* Zebra striping td */
tr:nth-of-type(odd) {
    background: #f3f3f3;
}

tr:nth-of-type(even) {
    /* green background:*/
    background: #dddddd;
    color: #000000;

}

th {

    background-color: #009879;
    color: #ffffff;
    text-align: center;
}
</style>
  