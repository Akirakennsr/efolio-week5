<template>
  <div>
    <h2>Book List</h2>
    <ul v-if="books.length">
      <li v-for="book in books" :key="book.id">
        <strong>{{ book.name }}</strong> (ISBN: {{ book.isbn }})
      </li>
    </ul>
    <div v-else>No books found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import db from '../firebase/init.js'

const books = ref([])

const fetchBooks = async () => {
  const querySnapshot = await getDocs(collection(db, "books"))
  books.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

onMounted(fetchBooks)
</script>