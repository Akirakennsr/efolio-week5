<template>
  <div class="container mt-4">
    <h1 class="text-center mb-3">All Books</h1>
    <div v-if="books && books.length">
      <ul class="list-unstyled text-start">
        <li v-for="book in books" :key="book.id" class="mb-3">
          <strong>{{ book.name }}</strong> (ISBN: {{ book.isbn }})
        </li>
      </ul>
    </div>
    <hr>
    <h5>Raw JSON:</h5>
    <pre v-if="rawJson">{{ rawJson }}</pre>
    <p v-if="errorMsg">{{ errorMsg }}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      books: null,
      rawJson: '',
      errorMsg: '',
    }
  },
  async mounted() {
    try {

      const response = await axios.get('https://getallbooks-qxu2guc3ya-uc.a.run.app')

      this.books = response.data
      this.rawJson = JSON.stringify(response.data, null, 2)
    } catch (error) {
      this.errorMsg = 'Error fetching all books'
    }
  }
}
</script>