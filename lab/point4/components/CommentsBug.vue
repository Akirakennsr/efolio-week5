<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { user } from '../stores/authMock'
import { fetchComments } from '../api/commentsMock'

const comments = ref([])
let stopWatch

onMounted(() => {
  // React whenever auth.user changes; also run once immediately.
  stopWatch = watch(
    user,
    async (u) => {
      if (u?.id) {
        comments.value = await fetchComments(u.id)
      } else {
        comments.value = []
      }
    },
    { immediate: true }
  )
})

onBeforeUnmount(() => {
  stopWatch?.()
})
</script>

<template>
  <div>
    <p data-test="count">{{ comments.length }}</p>
  </div>
</template>
