<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container-cart">
                    <!-- close button -->
                    <NButton class="close-button" @click="$emit('close')">
                        Close
                    </NButton>
                    <div v-if="loading" class="loading">
                        <n-spin :size="30" :show="loading">
                            <div class="loading-text">Loading...</div>
                        </n-spin>
                    </div>


                    <div class="container">
                        <!-- Ntable using array userCartWithProducts -->
                        <n-table>

                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Unidades</th>
                                    <th>Precio</th>
                                    <th>Subtotal</th>
                                    <th>Impuestos</th>
                                    <th>Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="product in userCartWithProducts" :key="product.id">
                                    <td>{{ product.nombre }}</td>
                                    <td>{{ product.cantidad }}</td>
                                    <td>{{ product.precio }}</td>
                                    <td>{{ product.subtotal }}</td>
                                    <td>{{ product.impuestos }}</td>
                                    <td>{{ product.total }}</td>
                                </tr>

                                <!-- suma de columna total -->
                                <tr v-if="userCartWithProducts.length > 0">
                                    <td colspan="5">Total</td>
                                    <td>{{ sumaTotal }}</td>
                                </tr>
                                <tr v-else-if="!loading">
                                    <td colspan="6">No hay productos en el carrito</td>
                                </tr>
                            </tbody>


                        </n-table>
                    </div>
                </div>
            </div>
        </div>
    </Transition>

</template>


<script setup>
import axios from 'axios';
import { defineProps, defineExpose, ref, onMounted } from "vue";
import { NSpin } from "naive-ui";
import { NTable } from "naive-ui";
import { NButton } from "naive-ui";

const loading = ref(true);
let userCart = ref([]);
let products = ref([]);


const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    }

});

let emits = defineEmits(["close"]);

let userCartWithProducts = ref([]);
const fetchUserCart = async (clienteRFC) => {
    try {
        let tokenStr = JSON.parse(localStorage.getItem("userState")).token;

        console.log("Fetching user cart");
        let data = await axios.get(`https://localhost:8080/api/carrito/${clienteRFC}`);
        let cart = data.data;

        let productos = await axios.get("https://localhost:8080/api/productos", { headers: { "Authorization": `Bearer ${tokenStr}` } });
        loading.value = false;
        return [cart, productos.data];
    }
    catch (error) {
        console.log(error);


    }
}

let sumaTotal = ref(0);

const createUserCart = (arrayUserCart, arrayProducts) => {
    //create an array with product.descripcion as the name, arrayUserCart.cantidad, arrayUserCart.precio, arrayU
    //impuestos,precio, skuProducto, subtotal, total
    let userCart = [];
    let sum = 0;
    for (let i = 0; i < arrayUserCart.length; i++) {
        let product = arrayProducts.find(product => product.sku == arrayUserCart[i].skuProducto);
        let subtotal = arrayUserCart[i].subtotal;
        let impuestos = arrayUserCart[i].impuestos;
        let total = arrayUserCart[i].total;
        console.log(parseFloat(total));
        sum += parseFloat(total);
        let userCartProduct = {
            "nombre": product.descripcion,
            "cantidad": arrayUserCart[i].cantidad,
            "precio": arrayUserCart[i].precio,
            "impuestos": impuestos,
            "skuProducto": arrayUserCart[i].skuProducto,
            "subtotal": subtotal,
            "total": total
        }
        userCart.push(userCartProduct);
    }
    sumaTotal.value = sum;
    return userCart;

}

//run function createUserCart when show is true, even after it's been created

onMounted(async () => {

    let clienteRFC = JSON.parse(localStorage.getItem("userState")).rfc;
    [userCart.value, products.value] = await fetchUserCart(clienteRFC);
    userCartWithProducts.value = createUserCart(userCart.value, products.value);
    console.log("userRFC: " + clienteRFC);
    console.log(userCart.value);
    console.log(userCartWithProducts.value);
    console.log(products.value);
    console.log("Table created");
});//onMounted is a lifecycle hook that is called when the component is mounted


</script>

<style scoped>
.modal-container-cart {

    width: fit-content;
    margin: 0px auto;
    padding: 1rem;
    background-color: hsl(180 40% 60%);
    border-radius: 2px;
    color: azure;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.close-button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 2px;
    background-color: #f44336;
    color: azure;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(301, 51%, 20%, 0.5);
    backdrop-filter: blur(2px);
    display: table;
    transition: all 0.3s ease;
}


td,
tr {
    margin: 0;
    text-align: center;
    outline: 1px solid silver;
}

th {
    background-color: #f44336;
    color: azure;
}
</style>