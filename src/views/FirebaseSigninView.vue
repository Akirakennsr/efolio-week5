<template>
    <h1>Firebase Sign In</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></
    <p><button @click="signin">Login to Firebase</button></p>
</template>
<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';
const email = ref('')
const password = ref('')
const router = useRouter();
const auth = getAuth();
const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Sign In successful");
      router.push("/");
      console.log(auth.currentUser);
    })
    .catch((error) => {
      console.log(error.code);
    });
};

</script>