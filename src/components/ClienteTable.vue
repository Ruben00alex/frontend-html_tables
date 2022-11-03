<template>
  <div>
    <p id="tablaCliente"></p>
  </div>
</template>

<script >
import axios from "axios";
export default {
  name: "ClienteTable",
  props: {},
  created() {
    console.log("ClienteTable created");
    axios.get("http://localhost:8080/api/clientes").then((result) => {
      let datosProductos = result.data;
      let tablaProductos = document.getElementById("tablaCliente");
      let tabla = document.createElement("table");
      let thead = document.createElement("thead");
      let tr = document.createElement("tr");
      let thRfc = document.createElement("th");
      let thNombre = document.createElement("th");
      let thEmail = document.createElement("th");

      thRfc.innerHTML = "RFC";
      thNombre.innerHTML = "Nombre";
      thEmail.innerHTML = "Email";

      tr.appendChild(thRfc);
      tr.appendChild(thNombre);
      tr.appendChild(thEmail);

      thead.appendChild(tr);
      tabla.appendChild(thead);
      tablaProductos.appendChild(tabla);
      for (let i = 0; i < datosProductos.length; i++) {
        let tr = document.createElement("tr");
        let tdRfc = document.createElement("td");
        let tdNombre = document.createElement("td");
        let tdEmail = document.createElement("td");

        tdRfc.innerHTML = datosProductos[i].rfc;
        tdNombre.innerHTML = datosProductos[i].nombre;
        tdEmail.innerHTML = datosProductos[i].email;

        tr.appendChild(tdRfc);
        tr.appendChild(tdNombre);
        tr.appendChild(tdEmail);

        tabla.appendChild(tr);
      }
    });
  },
};
</script>
