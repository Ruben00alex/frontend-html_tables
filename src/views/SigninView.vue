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
                <NInput v-model:value="username" />
            </NFormItem>
            <NFormItem label="Password">
                <NInput v-model:value="password" type="password" />
            </NFormItem>

            <NButton type="primary" @click="login();">Sign in</NButton>
        </NForm>


    </div>


</template>


<script setup>

import { NInput, NButton, NForm, NFormItem } from "naive-ui";
import { defineComponent, ref } from "vue";

const form = ref({
    rfc: "",
    username: "",
    password: "",
});




const signIn = () => {
    //send a post request to the backend
    axios.post("http://localhost:3000/api/auth/signin", {
        rfc: form.value.rfc,
        username: form.value.username,
        password: form.value.password,
    })
        .then((response) => {
            //if the response is ok, then the user is logged in
            if (response.status === 200) {
                //save the token in the local storage
                localStorage.setItem("token", response.data.accessToken);
                //redirect to the home page
                window.location.href = "/";
            }
        })
        .catch((error) => {
            //if the response is not ok, then the user is not logged in
            if (error.response.status === 401) {
                message.error("Wrong username or password");
            }
        });
};

</script>


<style scoped>

</style>