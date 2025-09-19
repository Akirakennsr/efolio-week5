// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
// app.component('DataTable', DataTable)
// app.component('Column', Column)

app.mount('#app')



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9sW4WtSco4aMZO9BmzVQc_Eb5w5-jqeo",
  authDomain: "week7-zehaoqian.firebaseapp.com",
  projectId: "week7-zehaoqian",
  storageBucket: "week7-zehaoqian.firebasestorage.app",
  messagingSenderId: "135739415780",
  appId: "1:135739415780:web:468eb8255788fe48d020f1"
};

// Initialize Firebase
initializeApp(firebaseConfig);