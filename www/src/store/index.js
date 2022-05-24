import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        defaultLocalUrl: "http://localhost:8088",
        currentMangaHost: "mapi.hotmangasg.com:12001",
        mangaHost: "www.manga2022.com",
        mangaHostGroup: [],
        loginPageBackImgUrl: "",
    },
    getters: {},
    mutations: {
        updateMangaHostGroup(state, arr) {
            state.mangaHostGroup = arr
            // console.log('PPP',arr, state.mangaHostGroup)
        },
    },
    actions: {},
    modules: {},
})
