<!-- eslint-disable prettier/prettier -->
<template>
    <div class="col-md-16">
        <p id="tablaProductos">
        </p>
    </div>
</template>

<script lang="js">
import axios from "axios";
import { NSpin } from "naive-ui";
export default {

    data() {
        return {
            loading: true,
        };
    },

    props: ["chosenTable"],

    name: "DatabaseTable",
    methods: {
        updateTable() {
            console.log("Updating table");
            let url = "http://localhost:8080/api/";
            url += this.chosenTable;
            axios.get(url).then((result) => {
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

                //create table header
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
    },
    created() {
        let url = "http://localhost:8080/api/";
        url += this.chosenTable;
        axios.get(url).then((result) => {
            let datosProductos = result.data;
            //Aqui se crea la tabla
            let tablaProductos = document.getElementById("tablaProductos");
            let tabla = document.createElement("table");
            let thead = document.createElement("thead");
            let tr = document.createElement("tr");


            //get datosProductos propsNames:
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
            this.updateTable();
        }

        )

    }
};

components: {
    NSpin
}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  