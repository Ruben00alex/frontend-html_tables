<!-- eslint-disable prettier/prettier -->
<template>
  <div class="col-md-16">
    <p id="tablaProductos">
    </p>
  </div>
</template>

<script lang="js">
import axios from "axios";
export default {

  name: "ProductosTable",
  created() {
    axios.get("http://localhost:8080/api/productos").then((result) => {
      let datosProductos = result.data;
      //Aqui se crea la tabla
      let tablaProductos = document.getElementById("tablaProductos");
      let tabla = document.createElement("table");
      let thead = document.createElement("thead");
      let tr = document.createElement("tr");
      let thId = document.createElement("th");
      let thSku = document.createElement("th");
      let thDescripcion = document.createElement("th");
      let thUnidad = document.createElement("th");
      let thCosto = document.createElement("th");
      let thPrecio = document.createElement("th");

      thId.innerHTML = "ID";
      thSku.innerHTML = "SKU";
      thDescripcion.innerHTML = "Descripcion";
      thUnidad.innerHTML = "Unidad";
      thCosto.innerHTML = "Costo";
      thPrecio.innerHTML = "Precio";

      tr.appendChild(thId);
      tr.appendChild(thSku);
      tr.appendChild(thDescripcion);
      tr.appendChild(thUnidad);
      tr.appendChild(thCosto);
      tr.appendChild(thPrecio);
      thead.appendChild(tr);
      tabla.appendChild(thead);
      tablaProductos.appendChild(tabla);
      //add data from datosProductos to table
      for (let i = 0; i < datosProductos.length; i++) {
        let tr = document.createElement("tr");
        let tdId = document.createElement("td");
        let tdSku = document.createElement("td");
        let tdDescripcion = document.createElement("td");
        let tdUnidad = document.createElement("td");
        let tdCosto = document.createElement("td");
        let tdPrecio = document.createElement("td");

        tdId.innerHTML = datosProductos[i].id;
        tdSku.innerHTML = datosProductos[i].sku;
        tdDescripcion.innerHTML = datosProductos[i].descripcion;
        tdUnidad.innerHTML = datosProductos[i].unidad;
        tdCosto.innerHTML = datosProductos[i].costo;
        tdPrecio.innerHTML = datosProductos[i].precio;

        tr.appendChild(tdId);
        tr.appendChild(tdSku);
        tr.appendChild(tdDescripcion);
        tr.appendChild(tdUnidad);
        tr.appendChild(tdCosto);
        tr.appendChild(tdPrecio);
        tabla.appendChild(tr);
      }
    }

    )

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
