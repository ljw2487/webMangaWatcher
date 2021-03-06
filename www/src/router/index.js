import Vue from 'vue'
import VueRouter from 'vue-router'
// import home from '../views/home.vue'
import welcome from '../views/_welcome.vue';
import login from '../views/_login.vue'

import homePage from '../views/0_homePage.vue'
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
    component: welcome,
    meta: {
      title: 'Welcome',
      content: 'welcomepage'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: 'Meteor-Manga -- Login',
      content: 'loginpage'
    }
  },
  {
    path: '/index',
    name: 'homePage',
    component: homePage,
    meta: {
      title: 'Meteor-Manga -- index',
      content: 'homepage'
    }
  },
  {
    path: '/bookShelf',
    name: 'bookShelf',
    component: bookShelf,
    meta: {
      title: 'Meteor-Manga -- bookShelf',
      content: 'welcomepage'
    }
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
