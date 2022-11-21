<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">default header</slot>
                    </div>

                    <div class="modal-body">

                        <NInput type="text" v-model:value="email" placeholder="Email" />
                        <NInput v-model:value="this.password" placeholder="Contraseña" type="password" />
                    </div>
                    <div class="modal-footer">
                        <p>{{ message }}</p>
                        <button class="modal-default-button" @click="login();">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>

</template>


<script>
import { NInput, NButton, NForm, NFormItem } from "naive-ui";
import axios from 'axios'

export default {
    name: "LoginComponent",
    props: {
        show: Boolean
    },
    components: {
        NInput,
        NButton,
        NForm,
        NFormItem
    },
    methods: {
        async login() {
            let url = "https://localhost:8080/api/login?email=" + this.email + "&password=" + this.password;
            let self = this;// aqui se guarda el this de la funcion porque dentro de la funcion axios no se puede usar this, pues referencia a otra cosa
            axios.post(url)
                .then(function (response) {
                    //retrieve token from response and save it in local storage
                    self.message = response.data.message;
                    // localStorage.setItem("token", response.data.token);
                    // localStorage.setItem("logged", true);
                    // localStorage.setItem("loggedUser", response.data.user);
                    console.log(response)
                    let loggedUser = response.data.loggedUser;
                    localStorage.setItem("userState", loggedUser);

                    alert("Login correcto");
                    self.$emit("close");



                    self.$parent.loggedIn = true;
                    console.log(self.$parent.loggedIn);
                    window.location.href = "/";

                })
                .catch(function (error) {
                    self.message = error.response.data.message;
                    alert(self.message);
                    console.log(error);
                });

        }
    },
    data() {
        return {
            email: "",
            password: "",
            message: "Introduce tus credenciales"
        }
    }


}

</script>



<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 3rem;
    background-color: rgb(78, 78, 78);
    border-radius: 2px;
    color: azure;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: azure;
}

.modal-body {
    margin: 20px 0;
    color: azure;
}

.modal-body>* {
    margin: 1rem 0;
}

.modal-default-button {
    float: right;
    margin: 1rem;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: left;
}
</style>