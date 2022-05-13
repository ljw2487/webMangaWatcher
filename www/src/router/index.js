import Vue from 'vue'
import VueRouter from 'vue-router'
// import home from '../views/home.vue'
import welcome from '../views/_welcome.vue';
import login from '../views/0.0_login.vue'
import homePage from '../views/0.1_homePage.vue'
import bookShelf from '../views/1_bookShelf.vue'
import myPage from '../views/2_myPage.vue'
import test from '../views/99_test.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: home
  // },
  {
    path: '/',
    name: 'welcome',
    component: welcome
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'homePage',
    component: homePage
  },
  {
    path: '/bookShelf',
    name: 'bookShelf',
    component: bookShelf
  },
  {
    path: '/myPage',
    name: 'myPage',
    component: myPage
  },
  {
    path: '/test',
    name: 'test',
    component: test
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
