<template>

    <h2>Carrito</h2>
    <div class="centered-grid">
        <div class="grid-layout">
            <ProductCard v-for="product in products" :key="product.sku" :product="product" :editable="false" />
        </div>
    </div>



</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
let tokenStr;
if (localStorage.getItem("userState") == null) {
    window.location.href = "/#/login";
} else {
    tokenStr = JSON.parse(localStorage.getItem("userState")).token;

}

console.log(tokenStr);

const products = ref([]);

onMounted(async () => {
    //get the products from the backend
    const response = await axios.get("https://localhost:8080/api/productos", { headers: { "Authorization": `Bearer ${tokenStr}` } });
    console.log(response.data);
    //save the products in the products variable
    products.value = response.data;
});


</script>

<style scoped>
.grid-layout {

    justify-items: center;
    align-items: center;
    /* grid with responsive columns */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-rows: 1fr;
    grid-auto-rows: 1fr;
    grid-auto-flow: row;
    grid-gap: 1rem;
    margin: 0 auto;
    width: calc(fi - 10rem);
    height: 100%;
    padding: 1rem;
    background-color: hsl(182, 30%, 60%);
    border-radius: 2rem;
    /*outlines the grid*/
    border: 1px solid black;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);





}

.centered-grid {
    justify-items: center;
    align-items: center;
    margin: 0 auto;
    border-radius: 2rem;
    padding: 1rem;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
}

/* outline the grid children */
.grid-layout>* {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
}
</style>