<template>
    <div>
        <nav-bar></nav-bar>
        <div class="home_background">
            <van-swipe
                class="my-swipe" 
                :autoplay="3000" 
                :show-indicators="false"
            >
                <van-swipe-item 
                    @click="clickBanner(index, item.brief, item.out_uuid)"
                    v-for="(item, index) in banners" 
                    :key="index"
                >
                    <img v-lazy="item.cover" />
                    <span>{{item.brief}}</span>
                </van-swipe-item>
            </van-swipe>
            <div class="userInfo">
                <span class="notLogin">welcome</span>
                <button class="darkbtn">当前未登录</button>
            </div>
            <div class="recs">
                <div class="recsTitle">
                    <div>
                        <span>精彩推荐 </span>
                        <van-icon name="wap-nav" />
                    </div>
                    <div>
                        <span>换一批</span>
                        <van-icon name="replay" />
                    </div>
                </div>
                <div class="recsItems">
                    <div v-for="(item, index) in recs.list" :key="index">
                        <div class="recsItems_img">
                            <van-image
                                :src="item.comic.cover"
                            />
                            <div class="recsItems_pop">
                                <van-icon name="fire-o" />
                                <span>{{hotnum(item.comic.popular)}}</span>
                            </div>
                        </div>
                        <div class="recsItems_info">
                            <div>
                                <span>{{item.comic.name}}</span>
                            </div>
                            <div>
                                <span>最新：</span>
                                <span>第111话</span>
                            </div>
                            <div v-for="(item, index) in item.comic.theme" :key="index">
                                <span v-if="index<2">{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div style="padding-top: 200px; background-color: darkred; height: 300px">123{{mangaHostGroup}}</div>
            <button @click="getHome">AXYB</button> -->
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import navBar from "../components/navBar.vue"
import { mapState, mapMutations } from "vuex"
import { Lazyload } from 'vant'

Vue.use(Lazyload)

export default {
    components: { navBar },
    data() {
        return {
            host: '',
            banners: [],
            recs: [],
        }
    },
    created() {
        // 检查网络连接
        this.axios.get(this.defaultLocalUrl + '/network', {
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
    mounted() {
        this.axios.get('https://mapi.hotmangasg.com:12001/api/v3/h5/discoverIndex/freeComic?platform=1&_update=true')
        .then((res) => {
            this.banners = res.data.results.banners
            this.recs = res.data.results.recs
            console.log(this.banners)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    methods: {
        ...mapMutations(["updateMangaHostGroup"]),
        clickBanner(index, brief, uuid){
            console.log(index, brief, uuid)
        },
        hotnum(num) {
            if(num.length<5) {
                return num
            } else {
                num = num + ''
                let newNum = `${num.charAt(0)}.${num.charAt(1)}w`
                return newNum
            }
        }
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

<style lang="scss" scoped>
.home_background {
    background-color: #3b3b3b;
    height: 2000px;
    padding-top: 3.286rem;
    padding-left: 1rem;
    padding-right: 1rem;
}
.my-swipe {
    margin: 1rem 0;
    border-radius: 5px;
    .van-swipe-item {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 167px;
        color: #A6A6A6;
        background-color: #2E2E2E;
        img {
            width: 100%;
        }
        span {
            position: absolute;
            width: 100%;
            padding: 0.1rem 0.6rem;
            left: 0;
            bottom: 0;
            font-size: 12px;
            background-color: rgba($color: #000000, $alpha: 0.6);
        }
    }
}
.userInfo {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding: 0.8rem 1rem;
    font-size: 1rem;
    color: #777777;
    background-color: #2E2E2E;
    border-radius: 5px;
    .notLogin {
        line-height: 1.8rem;
    }
    .darkbtn {
        padding: 0.4rem 1.6rem;
        margin: 0;
        line-height: 100%;
        color: #777777;
        background-color: #3b3b3b;
        border: none;
        border-radius: 1000px;
    }
}
.recs {
    .recsTitle {
        // background-color: yellowgreen;
        margin-bottom: 0.75rem;
        display: flex;
        justify-content: space-between;
        &>div:first-child {
            color: #BBBBBB;
            font-size: 1.2rem;
        }
        &>div:last-child {
            color: #777777;
            line-height: 1.8rem;
        }
    }
    .recsItems {
        display: flex;
        justify-content: space-between;
        &>div {
            width: 8rem;
            border-radius: 5px;
            background-color: #2E2E2E;
            .recsItems_img {
                height: 10.2rem;
                overflow: hidden;
                position: relative;
                border-radius: 5px 5px 0 0;
                &>.recsItems_pop {
                    position: absolute;
                    padding: 1px 5px;
                    top: 0;
                    right: 0;
                    font-size: 12px;
                    color: #BBBBBB;
                    border-radius: 0 5px 0 2px;
                    background-color: rgba($color: #000000, $alpha: 0.8);
                }
            }
            .recsItems_info {
                padding: 0.35rem;
            }
        }
    }
}
</style>
