<!-- eslint-disable prettier/prettier -->

<template>
    <div class="centered-div ">
        <h1><b> Inventario </b></h1>
        <InventarioTable />
    </div>
</template>

<script>
// @ is an alias to /src
import InventarioTable from "../components/InventarioTable.vue";
export default {
    name: "InventarioView",
    components: {
        InventarioTable,
    },
};
</script>

<style scoped>
.centered-div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}
</style>
