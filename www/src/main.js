import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/all.css'

// 引入的Utils
// import './utils/elementUi'
import './utils/vant'
import "@/assets/iconfont/iconfont.css"
import './utils/axios'

Vue.config.productionTip = false

// 设置动态meta & content
router.beforeEach((to, from, next) => {
  if(to.meta.content){
    let head = document.getElementsByTagName('head')
    let meta = document.createElement('meta')
    meta.content = to.meta.content
    head[0].appendChild(meta)
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
