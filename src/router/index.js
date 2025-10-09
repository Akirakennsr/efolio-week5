import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import { isAuthenticated } from '../auth'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import BookListView from '@/views/BookList.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
const labEnabled = import.meta.env.DEV && import.meta.env.VITE_SECURITY_LAB === 'true'

const routes = [
  {
    path: '/Getbookcount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path:'/FireLogin',
    name:'FireLogin',
    component:FirebaseSigninView
  },
  {
    path:'/FireRegister',
    name:'FireRegister',
    component:FirebaseRegisterView
  },
  {
    path:'/addbook',
    name:'AddBook',
    component:AddBookView
  },  
  {
    path: '/booklist',
    name: 'BookList',
    component: BookListView
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated.value) {
        next()
      } else {
        next('/login')
      }
    }
  }
]
if (labEnabled) {
  routes.push({
    path: '/__security',
    name: 'SecurityLab',
    component: () => import('../../lab/SecurityLab.vue')
  })
}
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router