import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        defaultLocalUrl: "http://localhost:8088",
        currentMangaHost: "mapi.hotmangasg.com:12001",
        mangaHostGroup: [],
        loginPageBackImgUrl: "",
    },
    getters: {},
    mutations: {
        updateMangaHostGroup(state, arr) {
            state.mangaHostGroup = arr
            // console.log('PPP',arr, state.mangaHostGroup)
        },

        // 生成背景图
        // getBackImgUrl() {
        //     this.axios.get(`${state.defaultLocalUrl}/setutime`, {
        //             params: {
        //                 tag: "ロリ|JK|JS|JC",
        //                 size: "regular",
        //             },
        //         })
        //         .then((res) => {
        //             // console.log(res)
        //             state.loginPageBackImgUrl = res.data.data[0].urls.regular
        //         })
        //         .catch((err) => {
        //             console.error(err)
        //         })
        // },
    },
    actions: {},
    modules: {},
})
