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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
