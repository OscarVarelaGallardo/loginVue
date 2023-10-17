<script setup>
import { useForm, useField } from 'vee-validate'
import { loginSchema } from '../validation/loginSchema.js'
import { useFirebaseAuth } from 'vuefire';
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from 'vue'
const { handleSubmit } = useForm({});

const userGoogle = ref([])
const showInfo = ref(false)
const provider = new GoogleAuthProvider();
const email = useField('email')
const password = useField('password');

const auth = useFirebaseAuth()

const submit = handleSubmit((values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            const user = userCredential.user;

        }).catch((error) => {
            const errorCode = error.code;
            console.log(errorCode)
        })
})

const submitFireBase = handleSubmit(() => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            userGoogle.value = user
            console.log(user)
            showInfo.value = true
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
})



</script>

<template>
    <v-card flat max-width="600" class="mx-auto mt-10">
        <v-card-title class="text-h4 font-weight-bold" tag="h3">
            Iniciar Sesión
        </v-card-title>
        <v-card-subtitle class="text-h5">
            Inicia Sesión con tu cuenta de Bitware

        </v-card-subtitle>
        <v-divider class="mt-3"></v-divider>
        <v-form class="mt-5">
            <v-text-field type="email" label="Email" bg-color="blue-grey-lighten-5" class="mb-3" v-model="email.value.value"
                :error-messages="email.errorMessage.value" />

            <v-text-field type="password" label="Password" bg-color="blue-grey-lighten-5" class="mb-3"
                v-model="password.value.value" :error-messages="password.errorMessage.value" />

            <v-btn block color="pink-accent-3" @click="submit">
                Iniciar Sesión
            </v-btn>


        </v-form>

        <v-card-subtitle class="text-h5 text-center 
        mt-10
        ">
            Inicia Sesión con tu cuenta de Google

        </v-card-subtitle>
        <v-divider class="mt-5 mb-10"></v-divider>

        <v-btn style="display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    margin: 0 auto;
                    color: white;
                    background-color: #4285F4;
                    margin-bottom: 10px
               ;
                    " color="red" icon="mdi-google" @click="submitFireBase">
            G
        </v-btn>


    </v-card>
    <v-card v-if="showInfo" flat max-width="600" class="mx-auto mt-10"
        style="display: flex; justify-content: center; flex-direction: column;
        align-items: center;

        "
    >
        <v-card-title class="text-h4 font-weight-bold" tag="h3">
            Información de Usuario
        </v-card-title>
        <v-card-subtitle class="text-p">

            Nombre: {{ userGoogle.displayName }}
        </v-card-subtitle>
        <v-card-subtitle class="text-p">

            Correo:{{ userGoogle.email }}
        </v-card-subtitle>
        <v-divider class="mt-3"></v-divider>
        <v-card-subtitle class="text-p">
            Mi foto de perfil es:
        </v-card-subtitle>
        <img :src="userGoogle.photoURL" alt="">
       <v-btn color="red" 
        style="margin-top: 10px"
       @click="showInfo = false">
                    Cerrar
                </v-btn>
    </v-card>

     
</template>
