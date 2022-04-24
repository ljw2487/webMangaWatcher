import Vue from 'vue'
import VueRouter from 'vue-router'
// import home from '../views/home.vue'
import homePage from '../views/0_homePage.vue'
import bookShelf from '../views/1_bookShelf.vue'
import myPage from '../views/2_myPage.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: home
  // },
  {
    path: '/',
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