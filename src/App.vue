<template>
  <div class="navBar">
    <nav>
      <router-link to="/">Inicio</router-link>
      <router-link to="/productos">Productos</router-link>
      <router-link to="/inventario">Inventario</router-link>
      <router-link to="/clientes">Clientes</router-link>
    </nav>
  </div>

  <div>
    <router-view />
  </div>

</template>

<style>
.inputProduct {
  /* grid with 2 columns */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
  padding: 1rem;

  align-items: center;

  justify-items: center;

  align-content: center;

  justify-content: center;

  background-color: #f1f1f1;

  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 1rem;
  padding: 1.3rem;
  border-radius: 0.5rem;
}

.navBar {
  position: relative;

  overflow: hidden;
  width: auto;
  margin: 1rem auto;
}

table,
th,
td {
  padding: 10px;
  text-align: center;
}

tr:last-of-type {
  border-bottom: 2px solid #009884;
}

html {

  background: linear-gradient(to bottom right, #fc00eb 10%, #00dbde 100%);
  background-size: cover;
  min-height: 100%;

}

body {

  font-family: 'Roboto', sans-serif;
}

h1 {
  color: #9BD69F;
  text-align: center;
  text-shadow: 1px 1px 12px #2b3d2c;
}

table {

  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 10px 10px 20px rgba(26, 0, 91, 0.531);

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
  position: relative;
  display: grid;
  justify-content: center;
  align-items: center;
}


#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  /*width is the amount of items*/
  width: 400px;
  padding: 15px;
  /*make the width */
  margin: 0 auto;
  background-color: #009879;
  border-radius: 10px;
  box-shadow: 10px 10px 20px rgba(4, 105, 85, 0.532);
}

nav a {
  font-weight: bold;

  color: #fffbfb;
  text-decoration: none;
  padding: 10px;
  border-radius: 10px;
  margin: 0 10px;
}


nav a.router-link-exact-active {

  color: #d2405d;
}
</style>
