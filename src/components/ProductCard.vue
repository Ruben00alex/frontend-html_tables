<template>
    <div class="cardContainer">
        <div class="columnTop">
            <!-- unsplash generic image -->

            <img class="cardImage" src="https://source.unsplash.com/600x400/?tech" alt="product image" />

        </div>

        <div class="columnBottom">
            <h3>{{ product.descripcion }}</h3>
            <p class="precio">${{ product.precio }}</p>
            <div class="productFooter">
                <p class="stock">Stock: {{ product.unidad }}</p>
                <NButton type="primary" @click="addToCart(product.sku);">Add to cart</NButton>
            </div>
        </div>
    </div>

</template>


<script  setup>
import { NButton } from "naive-ui";
import { computed } from "vue";
import axios from "axios";

//imgUrl is a random tech image from unsplash
const imgUrl = "https://source.unsplash.com/1600x900/?tech";

const emit = defineEmits(['update']);

function getRandomNumber() {
    return (Math.floor(Math.random() * 10));
}
const addToCart = async (productSKU) => {
    //clienteRFC = JSON.parse(localStorage.getItem("userState")).rfc;
    let clienteRFC = JSON.parse(localStorage.getItem("userState")).rfc;
    let tokenStr = JSON.parse(localStorage.getItem("userState")).token;
    //add the product to the cart
    //send a post request to the backend
    //example of url: localhost:8080/api/carrito?sku=1234&cantidad=1
    //construct the url
    let self = this;
    let url = "https://localhost:8080/api/carrito?sku=" + productSKU + "&cantidad=1" + "&clienteRFC=" + clienteRFC;
    let response = await axios.post(url, { headers: { "Authorization": `Bearer ${tokenStr}` } });

    //if the response is ok, then the user is logged in
    if (response.status === 200) {
        // alert("Producto agregado al carrito");

        emit("update");
        //refresh key of the component


    }
    else {
        alert("Error al agregar producto al carrito");
    }

};

//define props
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});



</script>


<style scoped>
.cardContainer {
    /* grid with 2rows and 1 column*/
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 7fr 1fr;
    row-gap: 1rem;


    width: 300px;
    height: 400px;
    background-color: hsl(182, 50%, 60%);

    filter: brightness(80%);
    transition: all 300ms ease-in-out;
}

.cardContainer:hover {
    filter: brightness(100%);
}

.columnTop {
    /*center image*/
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

.columnTop>img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.productFooter {

    display: flex;
    justify-content: space-between;
    width: calc(fit-content + 1rem);
    margin: 0 auto;
    padding: 0 1rem;
}
</style>