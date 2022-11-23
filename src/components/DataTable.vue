<template>
    <!-- //NTable using elements in arregloDeElementos which is a JSON array -->
    <NTable :dataSource="arregloDeElementos" :columns="columns" />





</template>



<script lang="ts" setup>
//import table from Naive UI:
import { NTable, NButton, NInput, NForm, NFormItem, NSelect, NSpace } from "naive-ui";

import axios from "axios";
import { ref, onMounted } from "vue";

let tokenStr = JSON.parse(localStorage.getItem("userState")).token;

const fetchData = async (chosenTable: string) => {

    const response = await axios.get(`https://localhost:8080/api/${chosenTable}`, { headers: { "Authorization": `Bearer ${tokenStr}` } });

    return response.data;
}


let arregloDeElementos = ref([]);
let columns = ref([]);

const props = defineProps({
    chosenTable: {
        type: String,
        required: true,
    },
    updateTable: {
        type: Function,
        required: false
    },
    updateProducts: {
        type: Function,
        required: false
    }
});


const updateTable = async (chosenTable: string) => {
    arregloDeElementos.value = await fetchData(chosenTable);
}

onMounted(async () => {
    arregloDeElementos.value = await fetchData(props.chosenTable);

    columns.value = Object.keys(arregloDeElementos.value[0]);
    console.log(columns.value);
});







</script>
