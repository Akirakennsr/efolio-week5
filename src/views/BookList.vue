<template>
  <div class="container d-flex justify-content-center">
    <div class="col-md-8 text-center">
      <h2 class="my-4">Book List</h2>

      <div class="mb-3 d-flex justify-content-center">
        <input 
          v-model="searchBook" 
          placeholder="Enter book name..." 
          class="form-control w-50"
        />
        <button class="btn btn-primary ms-2" @click="searchBooks">Search</button>
      </div>


      <div class="mb-4">
        <button class="btn btn-secondary btn-sm me-2" @click="fetchBooks">Refresh</button>
        <button class="btn btn-warning btn-sm me-2" @click="fetchBooksOrdered">Order by Name</button>
        <button class="btn btn-success btn-sm" @click="fetchBooksLimited">Limit 2</button>
      </div>


      <ul v-if="books.length" class="list-unstyled text-start">
        <li v-for="book in books" :key="book.id" class="mb-3">
          <div v-if="editId !== book.id">
            <strong>{{ book.name }}</strong> (ISBN: {{ book.isbn }})
            <button class="btn btn-sm btn-outline-primary ms-2" @click="startEdit(book)">Edit</button>
            <button class="btn btn-sm btn-outline-danger ms-2" @click="deleteBook(book.id)">Delete</button>
          </div>
          <div v-else>
            <input v-model="editName" class="form-control d-inline w-auto" />
            <button class="btn btn-sm btn-success ms-2" @click="updateBook(book.id)">Save</button>
            <button class="btn btn-sm btn-secondary ms-2" @click="cancelEdit">Cancel</button>
          </div>
        </li>
      </ul>
      <div v-else>No books found.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, deleteDoc, doc, updateDoc, query, where, orderBy, limit } from 'firebase/firestore'
import db from '../firebase/init.js'

const books = ref([])
const editId = ref(null)
const editName = ref('')
const searchBook = ref('')

const fetchBooks = async () => {
  searchBook.value = ''
  const querySnapshot = await getDocs(collection(db, "books"))
  books.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

// where
const searchBooks = async () => {
  if (!searchBook.value) {
    fetchBooks()
    return
  }
  const q = query(collection(db, "books"), where("name", ">=", searchBook.value), where("name", "<=", searchBook.value + '\uf8ff'))
  const querySnapshot = await getDocs(q)
  books.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}


// orderBy
const fetchBooksOrdered = async () => {
  const q = query(collection(db, "books"), orderBy("name"))
  const querySnapshot = await getDocs(q)
  books.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

// limit
const fetchBooksLimited = async () => {
  const q = query(collection(db, "books"), limit(2))
  const querySnapshot = await getDocs(q)
  books.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

// delete
const deleteBook = async (id) => {
  await deleteDoc(doc(db, "books", id))
  fetchBooks()
}

// edit
const startEdit = (book) => {
  editId.value = book.id
  editName.value = book.name
}
const cancelEdit = () => {
  editId.value = null
  editName.value = ''
}
const updateBook = async (id) => {
  await updateDoc(doc(db, "books", id), { name: editName.value })
  editId.value = null
  editName.value = ''
  fetchBooks()
}

onMounted(fetchBooks)
</script>