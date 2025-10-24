<template>
    <div class="container mt-4">
        <h1 class="text-center mb-3">Book Counter</h1>
        <button class="btn btn-primary mb-3" @click="getBookCount">Get Book Count</button>
        <p v-if="bookCount !== null" class="text-center">Total Books: {{ bookCount }}</p>
        <p v-if="errorMsg">{{ errorMsg }}</p>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      bookCount: null,
      errorMsg: '',
    }
  },
  methods: {
    async getBookCount() {
      try {
        const response = await axios.get('https://countbooks-qxu2guc3ya-uc.a.run.app')
        this.bookCount = response.data.bookCount;
        this.errorMsg = '';
      } catch (error) {
        console.error('Error fetching book count:', error);
        this.errorMsg = error;
        this.bookCount = null;
      }
    }
  }
}
</script>