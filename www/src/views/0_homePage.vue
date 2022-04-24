<template>
    <div>
        <nav-bar></nav-bar>
        <div style="background-color: #3b3b3b; height: 2000px">
            <div></div>
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
        let url = this.defaultLocalUrl + 'network'
        this.axios.get(url, {
            params: {
                currentHost: this.currentMangaHost,
            }
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.error(err); 
        })

    },
    methods: {
        ...mapMutations(["getAvailableHost"]),
    },
    computed: {
        ...mapState(["currentMangaHost", 'defaultLocalUrl']),
    },
}
</script>

<style lang="scss" scoped></style>
