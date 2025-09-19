<template>
    <div>
        <h1>Add book</h1>
        <form @submit.prevent="addBook">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" id="isbn" v-model="isbn" required />
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name" required />
            </div>
            <button type="submit">Add Book</button>
        </form>
    </div>
</template>

<script> 
import { ref } from 'vue';
import { collection, addDoc } from "firebase/firestore";    
import db from '../firebase/init.js';
import BookList from '../views/BookList.vue';

export default{
    setup() {
        const isbn = ref('');
        const name = ref('');

        const addBook = async () => {
            try {
                const isbnNumber = Number(isbn.value);
                if (isNaN(isbnNumber)) {
                    alert('ISBN must be a number.');
                    return;
                }

                await addDoc(collection(db, "books"), {
                    isbn: isbn.value,
                    name: name.value
                });
                isbn.value = '';
                name.value = '';
                alert('Book added successfully!');
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        };
        return {
            isbn,
            name,
            addBook
        };
    },
    components: {
        BookList
    }
};
</script>