<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/productos">Productos</router-link> |
    <router-link to="/inventario">Inventario</router-link> |
    <router-link to="/clientes">Clientes</router-link>
  </nav>
  <router-view />
</template>

<style>
table,
th,
td {
  padding: 10px;
  text-align: center;
}

tr:last-of-type {
  border-bottom: 2px solid #009884;
}

body {
  background: linear-gradient(90deg, #d69bd2 30%, #97d9e1 100%);
  font-family: 'Roboto', sans-serif;
}

h1 {
  color: rgb(237, 236, 236);
  text-align: center;
}

table {

  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

  width: 100%;
  font-family: 'Roboto', sans-serif;
}

td {

  font-size: 1.2em;

  padding: 12px 15px;
  text-align: center;
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

.centered {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 15px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
