<script setup>
import { ref, defineAsyncComponent } from 'vue'
const tab = ref('vhtml-unsafe')
</script>

<template>
  <main class="container p-4">
    <h1>Security Lab</h1>
    <nav class="space-x-2 my-3">
      <button @click="tab='vhtml-unsafe'">v-html (unsafe)</button>
      <button @click="tab='vhtml-safe'">v-html (DOMPurify)</button>
      <button @click="tab='url'">URL Params</button>
      <button @click="tab='token'">Token Storage</button>
    </nav>

    <section v-if="tab==='vhtml-unsafe'">
      <Suspense><component :is="defineAsyncComponent(() => import('../../lab/point5/vhtml/UnsafeBio.vue'))" /></Suspense>
    </section>
    <section v-else-if="tab==='vhtml-safe'">
      <Suspense><component :is="defineAsyncComponent(() => import('../../lab/point5/vhtml/SafeBio.vue'))" /></Suspense>
    </section>
    <section v-else-if="tab==='url'">
      <Suspense><component :is="defineAsyncComponent(() => import('../../lab/point5/url/UrlDemo.vue'))" /></Suspense>
    </section>
    <section v-else>
      <Suspense><component :is="defineAsyncComponent(() => import('../../lab/point5/token/TokenDemo.vue'))" /></Suspense>
    </section>
  </main>
</template>
