import { createRouter, createWebHistory } from 'vue-router'

import HomePage from "../views/HomePage.vue";
import ProfilPage from "../views/ProfilPage.vue";
import AdminPage from "../views/AdminPage.vue";
import LoginPage from "../views/LoginPage"

const routes = [
  {
    path: "/",
    name: "Home-Page",
    component: HomePage,
  },
  {
    path: "/profil/:id",
    name: "Profil-Page",
    component: ProfilPage,
  },
  {
    path: "/admin",
    name: "Admin-Page",
    component: AdminPage,
  },
  {
    path: "/login",
    name: "Login-Page",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
