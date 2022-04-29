<template>
    <div>
        <nav-bar></nav-bar>
        <div style="background-color: #3b3b3b; height: 2000px">
            <div style="padding-top: 200px; background-color: darkred; height: 300px">123{{mangaHostGroup}}</div>
        </div>
    </div>
</template>

<script>
import navBar from "../components/navBar.vue"
import { mapState, mapMutations } from "vuex"
export default {
    components: { navBar },
    data() {
        return {
            //   navShow: 'navOn',
        }
    },
    mounted() {
        // 检查网络连接
        let url = this.defaultLocalUrl + '/network'
        this.axios.get(url, {
            params: {
                currentHost: this.currentMangaHost,
            }
        })
        .then(res => {
            let hostArray = []
            let updateMangaHost = res.data.results.api
            updateMangaHost.forEach(element => {
                element.forEach(i => {
                    hostArray.push(i)
                })
                updateMangaHost = hostArray
            })
            hostArray = null
            console.log(updateMangaHost)
            this.updateMangaHostGroup(updateMangaHost)
        })
        .catch(err => {
            console.error(err); 
        })

    },
    methods: {
        ...mapMutations(["updateMangaHostGroup"]),
    },
    computed: {
        ...mapState([
            "currentMangaHost", 
            'defaultLocalUrl', 
            'mangaHostGroup'
        ]),
    },
}
</script>

<style lang="scss" scoped></style>
