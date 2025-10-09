<script setup>
import { ref } from 'vue'
const q = ref('')
async function searchUnsafe() {
  await fetch('/api/search?q=' + q.value)
}
async function searchSafe() {
  const u = new URL('/api/search', window.location.origin)
  u.searchParams.set('q', q.value)
  await fetch(u)
}
</script>
<template>
  <div>
    <input v-model="q" placeholder="try: abc &redirect=javascript:alert(1)" />
    <button @click="searchUnsafe">Unsafe Search</button>
    <button @click="searchSafe">Safe Search</button>
  </div>
</template>
