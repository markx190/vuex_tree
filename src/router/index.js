import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../components/LoginPage.vue";
import Register from "../components/RegisterPage.vue";
const Profile = () => import("../components/ProfilePage.vue")


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/contents',
    name: 'contents',
    component: () => import('../views/ContentList.vue')
  },
  {
    path: "/contents/:id",
    name: "content-details",
    component: () => import("../views/ContentItem.vue")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("../views/AddContent.vue")
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  }
]

const router = new VueRouter({
  routes
})

export default router
