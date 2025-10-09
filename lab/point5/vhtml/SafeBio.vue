<script setup>
import { ref, computed } from 'vue'
import DOMPurify from 'dompurify'
const input = ref('')
const safeHtml = computed(() => DOMPurify.sanitize(input.value || ''))
</script>
<template>
  <div>
    <input v-model="input" placeholder="Paste HTML payload" />
    <div class="preview" v-html="safeHtml"></div>
  </div>
</template>

