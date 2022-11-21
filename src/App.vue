<template>
  <title>Sitio e-commerce </title>
  <div class="navBar">
    <nav>
      <router-link to="/">Inicio</router-link>

      <router-link to="/tabla">Tabla</router-link>
      <router-link to="/productos">Productos</router-link>
      <router-link to="/inventario">Inventario</router-link>
      <router-link to="/clientes">Clientes</router-link>
      <!-- carrito -->
      <router-link to="/carrito">Carrito</router-link>
      <router-link to="/signin">Signup</router-link>
    </nav>
    <!-- if logedIn is true, show logout button, else show login button -->
    <h2 v-if="loggedIn">Bienvenido {{ loggedUser.nombre }}!</h2>
    <a v-else href="#/signin">test</a>
    <n-button v-if="loggedIn" @click="logout">Logout</n-button>
    <n-button v-else id="botonLogin" type="primary" @click="showModal = true">Login</n-button>

    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <LoginComponent :show="showModal" @close="showModal = false">
        <template #header>
          <h3>Login </h3>
        </template>
      </LoginComponent>
    </Teleport>
  </div>


  <router-view />
</template>


<script>
import { NButton } from 'naive-ui'


export default {
  name: 'App',
  components: {
    NButton,

  },
  data() {
    return {
      showModal: false,
      loggedUser: localStorage.getItem("userState") != null ? JSON.parse(localStorage.getItem("userState")) : null,
      loggedIn: JSON.parse(localStorage.getItem("userState")) != null ? true : false,
    }
  },
  setup() {

  },
  methods: {
    logout() {
      localStorage.removeItem("userState");
      this.loggedIn = false;

      this.$router.push("/");

    }
  }
}


</script>


<style>
.navBar {
  position: relative;
  width: auto;
  margin: 1rem 1rem;
  /* Display elements next to each other */
  display: flex;
  /* Align items to the center */
  /* Justify content to the center */
  justify-content: center;

}

.centered {
  width: fit-content;
  margin: 0 auto;
}


html {
  background-color: #21D4FD;
  /*background-image: linear-gradient(19deg, #21D4FD, hsl(281, 100%, 46%), hsl(281, 100%, 56%), hsl(281, 100%, 86%), hsl(332, 100%, 56%), #21D4FD);*/
  background-image: linear-gradient(to right, #fc5c7d, #6a82fb);
  color: hsl(168, 100%, 45%);
  background-size: 500%;
  background-attachment: fixed;
  /*fixed background*/

  animation: bg_animation 25s ease infinite alternate;
}

@keyframes bg_animation {
  0% {
    background-position: left;
  }


  100% {

    background-position: right;
  }
}

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

h1 {
  color: hsl(168, 100%, 45%);
  text-align: center;
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#botonLogin {
  position: relative;
  right: 0;
  margin: 1rem;
}

nav {
  width: fit-content;
  padding: 0;

  margin: 2rem auto;
  background-color: hsl(168, 80%, 20%);
  border-radius: 10px;
  box-shadow: 3px 3px 20px rgba(4, 105, 85, 0.532);
}

nav a {
  font-weight: bold;
  color: hsl(168, 100%, 75%);
  text-decoration: none;
  padding: 1rem;
  margin: 0;
  background-color: hsl(168, 80%, 25%);
  transition: background-color 300ms ease-in-out, padding 300ms ease-in-out;



}

nav a:first-child {
  margin-left: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

}

nav a:last-child {
  margin-right: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

nav a:focus,
nav a:hover {
  background-color: hsl(168, 100%, 30%);
  color: hsl(168, 100%, 60%);
  padding: 1.25rem 1.5rem;

}




nav a.router-link-exact-active {

  color: hsl(61, 100%, 60%);
}
</style>
