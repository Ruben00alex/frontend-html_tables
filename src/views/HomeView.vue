<template>
    <div class="centered">
        <h1><b>Inicio</b></h1>
        <p><b> Bienvenido {{ this.$parent.loggedUser }} sa la tienda de productos! <br>
                Por favor seleccione una opción del menú de navegación
            </b> </p>

    </div>


</template>

<script>
export default {
    created() {
        document.title = 'Inicio'
    }

}

</script>


<style scoped>

</style>