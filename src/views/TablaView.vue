<template>
    <div id="seccionIzquierda">
        <n-space vertical>
            <n-select placeholder="Please select a song" :options="options" @update:value="forceUpdateFun" />
        </n-space>
    </div>
    <TablePage :chosenTable="chosenTable" ref="tablePage" :key="chosenTable" />
</template>


<script lang="ts" setup>
import { NSelect, NSpace } from "naive-ui";
import { nextTick, ref } from 'vue';
let chosenTable = ref("productos");
const renderComponent = ref(true);

const forceUpdateFun = (value: string) => {
    chosenTable.value = value;
};
const updateValue = (value: string) => {
}

const test = (value: string) => {
    console.log(value);
};

const options = [
    {
        label: 'Productos',
        value: 'productos'
    },
    {
        label: 'Inventario',
        value: 'inventario'
    },
    {
        label: 'Clientes',
        value: 'clientes'
    },
    {
        label: 'Carrito',
        value: 'carrito'
    },
]


</script>


<style scoped>
#seccionIzquierda {
    width: 50%;
    height: 100%;
    background-color: #f0f0f0;

    margin: 0 auto;
}
</style>
