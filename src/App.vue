<template>

  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/productos">Productos</router-link> |
    <router-link to="/inventario">Inventario</router-link>
  </nav>
  <router-view />
</template>

<style>
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
