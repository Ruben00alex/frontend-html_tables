<!-- eslint-disable prettier/prettier -->
<template>
    <div class="col-md-16">
        <p id="tablaInventario">
        </p>
    </div>
</template>
  
<script lang="js">
import axios from "axios";
export default {

    name: "inventario",
    props: {
        msg: String,
    },
    created() {
        console.log("InventarioTable created");
        axios.get("http://localhost:8080/api/inventario").then((result) => {
            let datosProductos = result.data;
            let tablaProductos = document.getElementById("tablaInventario");
            let tabla = document.createElement("table");
            let thead = document.createElement("thead");
            let tr = document.createElement("tr");
            let thSku = document.createElement("th");
            let thCantidad = document.createElement("th");
            let thCantidadEnReserva = document.createElement("th");
            let thMinimo = document.createElement("th");
            let thEstado = document.createElement("th");

            thSku.innerHTML = "SKU";
            thCantidad.innerHTML = "Cantidad";
            thCantidadEnReserva.innerHTML = "Cantidad en reserva";
            thMinimo.innerHTML = "Minimo";
            thEstado.innerHTML = "Estado";

            tr.appendChild(thSku);
            tr.appendChild(thCantidad);
            tr.appendChild(thCantidadEnReserva);
            tr.appendChild(thMinimo);
            tr.appendChild(thEstado);


            thead.appendChild(tr);
            tabla.appendChild(thead);
            tablaProductos.appendChild(tabla);
            //add data from datosProductos to table
            for (let i = 0; i < datosProductos.length; i++) {
                let tr = document.createElement("tr");
                let tdSku = document.createElement("td");
                let tdCantidad = document.createElement("td");
                let tdCantidadEnReserva = document.createElement("td");
                let tdMinimo = document.createElement("td");
                let tdEstado = document.createElement("td");



                tdSku.innerHTML = datosProductos[i].sku;
                tdCantidad.innerHTML = datosProductos[i].cantidad;
                tdCantidadEnReserva.innerHTML = datosProductos[i].cantidadEnReserva;
                tdMinimo.innerHTML = datosProductos[i].minimo;
                tdEstado.innerHTML = datosProductos[i].estado;

                tr.appendChild(tdSku);
                tr.appendChild(tdCantidad);
                tr.appendChild(tdCantidadEnReserva);
                tr.appendChild(tdMinimo);
                tr.appendChild(tdEstado);

                tabla.appendChild(tr);
            }
        }

        )

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
