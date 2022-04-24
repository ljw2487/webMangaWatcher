import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defaultLocalUrl: 'http://localhost:8088/',
    currentMangaHost: 'www.manga2022.com',
    mangaHostGroup: [],

  },
  getters: {
  },
  mutations: {
    // 请求网络通信地址
    getAvailableHost() {
      console.log('start VueX Function <getAvailableHost>')
      let url = this.state.currentMangaHost + 'api/v3/system/network2?platform=1'
      this.$axios.get(url)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err); 
      })

    },
    
  },
  actions: {
  },
  modules: {
  }
})
