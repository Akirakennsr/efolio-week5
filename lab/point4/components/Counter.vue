<script setup>
import { ref } from 'vue'
const props = defineProps({ readonly: { type: Boolean, default: false } })
const count = ref(0)
function inc() {
  if (props.readonly) return
  count.value++
}
</script>

<template>
  <div>
    <p data-test="value">{{ count }}</p>
    <button data-test="btn" @click="inc" :disabled="props.readonly">+1</button>
  </div>
</template>
