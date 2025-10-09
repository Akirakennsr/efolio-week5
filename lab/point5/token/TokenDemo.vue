<script setup>
function loginInsecure() {
  localStorage.setItem('token', 'demo.jwt.payload')
}
function loginSecureLike() {
  localStorage.removeItem('token')
  fetch('/api/me', { credentials: 'include' }) // 模拟 Cookie 流程
}
</script>
<template>
  <div class="space-y-2">
    <button @click="loginInsecure">Login (Insecure: localStorage)</button>
    <button @click="loginSecureLike">Login (Secure-like: Cookie)</button>
    <p>Check DevTools → Application → Local Storage, and Network → Request Credentials</p>
  </div>
</template>
