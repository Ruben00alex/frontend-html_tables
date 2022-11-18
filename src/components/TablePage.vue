<template>
    <div class="centered">
        <div class="top-container">
            <div class="tabla">
                <h1><b> {{ this.chosenTable.charAt(0).toUpperCase() + this.chosenTable.slice(1) }} </b></h1>
                <!-- DatabaseTable element using a chosenTable of this.chosenTable -->
                <DatabaseTable ref="dataTable" :chosenTable="chosenTable" />
            </div>
            <!-- Make the div appear/dissapear with a button click toggle -->
            <div id="columnaDerecha">
                <n-button type="primary" @click="toggleEditTable">Editar</n-button>
                <div v-if="showEditTable">
                    <!-- EditTable element using a chosenTable of this.chosenTable -->
                    <Suspense>
                        <EditTable ref="editTable" :chosenTable="chosenTable" />
                    </Suspense>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import { NButton } from "naive-ui";

export default {
    name: "TablePage",
    components: {
        NButton
    },
    props: {
        chosenTable: {
            type: String,
            required: true,
        },

    },
    created() {
        this.showEditTable = false;
        //capitalize chosenTable
        let capitalizedTable = this.chosenTable.charAt(0).toUpperCase() + this.chosenTable.slice(1);

        document.title = capitalizedTable;
        console.log(this.chosenTable);
    },

    data() {
        return {
            showEditTable: false,
        };
    },
    //toggle the showEditTable prop
    methods: {

        toggleEditTable() {
            this.showEditTable = !this.showEditTable;
            console.log(this.showEditTable);
        },
    },
};

</script>

<style>
@import "../styles/View.css";
</style>