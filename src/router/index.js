import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/LoginPage.vue';
import Register from '../components/RegisterPage.vue';
import FileUpload from '../components/FileUpload.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/upload',
    name: 'FileUpload',
    component: FileUpload
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
