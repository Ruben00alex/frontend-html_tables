<template>
    <div class="centered">
        <!-- Sign in form using Naive UI -->
        <h1>Registro</h1>
        <!-- user will have rfc, name and password -->
        <NForm :model="user" :rules="rules" ref="form">

            <NFormItem label="RFC">
                <NInput v-model:value="form.rfc" />
            </NFormItem>
            <NFormItem label="Username">
                <NInput v-model:value="form.username" />
            </NFormItem>
            <NFormItem label="Email">
                <NInput v-model:value="form.email" />
            </NFormItem>
            <NFormItem label="Password">
                <NInput v-model:value="form.password" type="password" />
            </NFormItem>

            <NButton type="primary" @click="signup();">Sign up</NButton>
        </NForm>


    </div>


</template>


<script setup>

import { NInput, NButton, NForm, NFormItem } from "naive-ui";
import { defineComponent, ref } from "vue";
import axios from "axios";
const form = ref({
    rfc: "",
    username: "",
    password: "",
    email: ""
});




const signup = () => {

    //send a post request to the backend
    //example of url: localhost:8080/api/clientes?nombre=Alex&email=email@email.com&rfc=1234

    //construct the url
    let url = "https://localhost:8080/api/clientes?nombre=" + form.value.username + "&email=" + form.value.email + "&rfc=" + form.value.rfc + "&password=" + form.value.password;

    axios.post(url)
        .then((response) => {
            //if the response is ok, then the user is logged in
            if (response.status === 200) {
                alert("Usuario registrado");
                //redirect to the home page
                window.location.href = "/";
            }
        })
        .catch((error) => {
            //if the response is not ok, then the user is not logged in
            if (error.response.status === 401) {
                alert(error.response.data);
                message.error("Wrong username or password");
            }
        });
};

</script>


<style scoped>

</style>