<template>
  <div>
    <h2>Book List</h2>
    <div>
      <button class="btn btn-secondary btn-sm mb-2" @click="fetchBooks">Refresh</button>
      <button class="btn btn-info btn-sm mb-2" @click="fetchBooksByName">Query: Name contains 'Vue'</button>
      <button class="btn btn-warning btn-sm mb-2" @click="fetchBooksOrdered">Order by Name</button>
      <button class="btn btn-success btn-sm mb-2" @click="fetchBooksLimited">Limit 2</button>
    </div>
    <ul v-if="books.length">
      <li v-for="book in books" :key="book.id">
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, deleteDoc, doc, updateDoc, query, where, orderBy, limit } from 'firebase/firestore'
import db from '../firebase/init.js'

const books = ref([])
const editId = ref(null)
const editName = ref('')

const fetchBooks = async () => {
  const querySnapshot = await getDocs(collection(db, "books"))
  books.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

// 查询：where
const fetchBooksByName = async () => {
  const q = query(collection(db, "books"), where("name", ">=", "Vue"))
  const querySnapshot = await getDocs(q)
  books.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

// 查询：orderBy
const fetchBooksOrdered = async () => {
  const q = query(collection(db, "books"), orderBy("name"))
  const querySnapshot = await getDocs(q)
  books.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

// 查询：limit
const fetchBooksLimited = async () => {
  const q = query(collection(db, "books"), limit(2))
  const querySnapshot = await getDocs(q)
  books.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

// 删除
const deleteBook = async (id) => {
  await deleteDoc(doc(db, "books", id))
  fetchBooks()
}

// 编辑
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