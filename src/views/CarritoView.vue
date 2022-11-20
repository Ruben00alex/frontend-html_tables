<template>

    <div class="centered">
        <h2>Carrito</h2>
        <div class="grid-layout">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    </div>



</template>

<script setup>


</script>

<style scoped>
.grid-layout {

    /* grid with responsive columns */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-rows: 1fr;
    grid-auto-rows: 1fr;
    grid-auto-flow: row;
    grid-gap: 1rem;
    /* 1st element will have top margin auto */
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 100%;
    padding: 1rem;
    background-color: #7FFFD4;
    border-radius: 10px;
}
</style>