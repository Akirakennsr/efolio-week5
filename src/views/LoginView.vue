<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Login</h1>
    <form v-if="!isAuthenticated" @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="username"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
          required
        />
      </div>
      <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
    <div v-else class="alert alert-success mt-3">You are logged in!</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '../auth'

const username = ref('')
const password = ref('')
const errorMsg = ref('')

const VALID_USERNAME = 'user123'
const VALID_PASSWORD = 'pass123'

const router = useRouter()

const handleLogin = () => {
  errorMsg.value = ''
  if (!username.value || !password.value) {
    errorMsg.value = 'Please enter both username and password.'
    isAuthenticated.value = false
    return
  }
  if (username.value === VALID_USERNAME && password.value === VALID_PASSWORD) {
    isAuthenticated.value = true
    router.push('/about')
  } else {
    isAuthenticated.value = false
    errorMsg.value = 'Invalid username or password.'
  }
}
</script>

<style scoped>
</style>
