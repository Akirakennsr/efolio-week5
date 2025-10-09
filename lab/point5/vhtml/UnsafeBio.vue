<script setup>
import { ref } from 'vue'
const input = ref('')
</script>
<template>
  <div>
    <input v-model="input" placeholder="Paste HTML payload" />
    <div class="preview" v-html="input"></div>
  </div>
</template>
