<template>
    <div class="cardContainer">
        <h3>iPhone X</h3>
        <p class="precio">$29.99</p>
        <p class="stock">Stock: 10 unidades</p>
        <NButton type="primary" @click="handleClick">Agregar al carrito</NButton>
    </div>

</template>


<script setup>
</script>


<style scoped>
.cardContainer {
    width: 300px;
    height: 400px;
    background-color: #f1f1f1;
}
</style>