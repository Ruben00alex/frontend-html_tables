<!-- eslint-disable prettier/prettier -->

<template>
    <div class="inventarioTable">
        <h1><b> Inventario </b></h1>
        <p id="tablaInventario">
        </p>
    </div>
</template>

<script>
// @ is an alias to /src
import IT from "@/components/InventarioTable.vue";

export default {
    name: "InventarioView",
    components: {
        IT,
    },
};
</script>
