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

  border: 1px solid rgb(8, 0, 255);
}

table {
  border-collapse: collapse;
}

td {

  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  font-size: 1.2em;


  text-align: left;
  padding: 5px;
  text-align: left;
}

th {
  background-color: #aa0476;
  color: white;
}

.centered {
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
