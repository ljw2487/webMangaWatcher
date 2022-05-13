<template>
    <div>
        <nav-bar></nav-bar>
        <keep-alive>
            <div class="home_background">
                <van-swipe
                    class="my-swipe" 
                    :autoplay="3000" 
                    :show-indicators="false"
                >
                    <van-swipe-item 
                        @click="clickBanner(index, item.comic.path_word, item.out_uuid)"
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
                        <div @click="getAllRecs">
                            <span>精彩推荐&nbsp;</span>
                            <van-icon 
                                class="iconfont"
                                class-prefix="van-icon"
                                name="showall" 
                                size="19" 
                            />
                        </div>
                        <button @click="getMoreRecs">
                            <span>换一批&nbsp;</span>
                            <van-icon name="replay" :class="loadingRecs?'loading':''" />
                        </button>
                    </div>
                    <div class="recsItems" v-if="loadRecs == 3">
                        <div 
                            v-for="(item, index) in recs.list" 
                            :key="index"
                            @click="getAllRecs(index, item.comic.path_word, item.comic.name)"
                        >
                            <div class="recsItems_img">
                                <van-image
                                    :src="item.comic.cover"
                                />
                                <div class="recsItems_pop">
                                    <van-icon name="fire-o" />
                                    <span>{{hotNum(item.comic.popular)}}</span>
                                </div>
                                <div class="recsItems_time">
                                    <span>{{item.comic.datetime_updated}}</span>
                                </div>
                            </div>
                            <div class="recsItems_info">
                                <div>
                                    <span>{{item.comic.name}}</span>
                                </div>
                                <div>
                                    <span>最新：</span>
                                    <span>{{item.comic.last_chapter}}</span>
                                    <!-- <span v-else>加载中</span> -->
                                </div>
                                <template v-for="(item, index) in item.comic.theme">
                                    <span class="mangaTheme" v-if="index<2" :key="index">{{item.name}}</span>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="recsItems" v-else>
                        <div v-for="(item,index) in 3" :key="index">
                            <div class="recsItems_img">
                            </div>
                            <div class="recsItems_info">
                                <div></div>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                                <span class="mangaTheme" style="background-color: rgba(0,0,0,0);"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="allManga">
                    <div class="allMangaTitle">
                        <div>
                            <span>漫画列表&nbsp;</span>
                            <!-- <van-icon 
                                class="iconfont"
                                class-prefix="van-icon"
                                name="showall" 
                                size="19" 
                            /> -->
                        </div>
                    </div>
                    <div class="allMangaFilter">
                        <van-swipe :loop="false" :width="49" :show-indicators="false">
                            <van-swipe-item
                                @click="clickTheme('all')"
                                :style="{color:(activeTheme == 0 ? 'red' : '')}"
                            >
                                全部
                            </van-swipe-item>
                            <van-swipe-item 
                                @click="clickTheme(index, item.path_word)"
                                v-for="(item, index) in hotTheme" 
                                :key="index" 
                                :class="item.name.length>2 ? 'longerItem' : ''"
                                :style="{color:(activeTheme == index+1 ? 'red' : '')}"
                            >
                                {{item.name}}
                            </van-swipe-item>
                            <van-swipe-item 
                                @click="clickTheme('more')"
                                :style="{color:(activeTheme == 99 ? 'red' : '')}"
                            >
                                &lt;查看所有>
                            </van-swipe-item>
                            <van-swipe-item>&nbsp;&nbsp;</van-swipe-item>
                        </van-swipe>
                        <div class="allMangaOrdering">
                            <div
                                v-for="(item, index) in ordering"
                                :key="index"
                                @click="clickOrdering(index)"
                                :class=" activeOrdering == index ? 'activeOrdering' : '' "
                            >
                                {{item}}
                                <van-icon 
                                    class="iconfont"
                                    class-prefix="van-icon"
                                    :name=" activeOrderingType[index] == 0 ? 'arrow-down' : 'arrow-up' " 
                                    size="8" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div style="padding-top: 200px; background-color: darkred; height: 300px">123{{mangaHostGroup}}</div>
                <button @click="getHome">AXYB</button> -->
            </div>
        </keep-alive>
        <tab-bar></tab-bar>
    </div>
</template>

<script>
import Vue from 'vue'
import navBar from "../components/navBar.vue"
import TabBar from '../components/tabBar.vue'
import { mapState, mapMutations } from "vuex"
import { Lazyload } from 'vant'

Vue.use(Lazyload)

export default {
    components: { navBar, TabBar },
    data() {
        return {
            host: '',
            banners: undefined,
            recs: [],
            loadRecs: 0,
            loadingRecs: false,
            recsOffset: 0,
            hotTheme: undefined,
            ordering: undefined,
            activeTheme: 0,
            activeOrderingType: {
                popular : 0,
                datetime_updated : 0,
            },
            activeOrdering: 'popular',
            filter: {
                ordering: '-popular',
                theme: 'all'
            },
            currentTheme: '',
            mangaPage: 0,
            mangaTotal: undefined,
            mangaList: [],
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
        this.getBannerAndRecs()
        this.getHotThemes()
        this.getMangaLists()
    },
    methods: {
        ...mapMutations(["updateMangaHostGroup"]),
        getBannerAndRecs(){
            console.log('start -> getBannerAndRecs()')
            if (!this.banners == undefined) return
            else (
                this.axios.get(`https://${this.currentMangaHost}/api/v3/h5/discoverIndex/freeComic?platform=1&_update=true`)
                .then((res) => {
                    this.banners = res.data.results.banners
                    this.recs = res.data.results.recs
                    console.log(this.banners)
                    this.getMangaUpdate()
                    // console.log('Finish -> getBannerAndRecs()')
                })
                .catch((err) => {
                    console.log(err)
                })
            )
        },
        getMoreRecs(){
            console.log('start -> getMoreRecs()')
            this.loadingRecs = false
            this.loadRecs = 0
            this.recsOffset += 3
            console.log(this.recsOffset)
            this.axios.get(`https://${this.currentMangaHost}/api/v3/recs?pos=2201202&limit=3&offset=${this.recsOffset}&free_type=1`)
            .then((res) => {
                // console.log(res)
                this.recs = res.data.results
                this.loadingRecs = true
                this.getMangaUpdate()
                // console.log('Finish -> getMoreRecs()')
            })
            .catch((err) => {
                console.log(err)
            })
        },
        getAllRecs(index, path, name){
            console.log(`start -> getAllRecs(${index},${path},${name})`)
        },
        getHotThemes(){
            if (!this.hotTheme == undefined) return
            else (
                this.axios.get(`https://${this.currentMangaHost}/api/v3/h5/filterIndex/comic/tags?type=1`)
                .then((res) => {
                    this.ordering = res.data.results.ordering
                    this.hotTheme = res.data.results.theme
                    console.log(this.ordering,this.hotTheme)
                })
                .catch((err) => {
                    console.log(err)
                })
            )
        },
        getMangaLists(){
            console.log(`start -> getMangaLists() -> ${this.filter.theme}${this.filter.ordering}`)
            let ordering = `&ordering=${this.filter.ordering}`
            let theme = ''
            if (this.filter.theme != 'all' && this.filter.theme != 'more') {
                theme = `&theme=${this.filter.theme}`
            }
            if (this.currentTheme != this.filter.theme) {
                this.mangaPage = 0
            } else {
                this.currentTheme = this.filter.theme
            }
            if (this.mangaTotal != undefined && this.mangaPage*21 > this.mangaTotal) {
                return console.log('超出数量')
            }
            let tag = `&limit=21&offset=${this.mangaPage}${theme}${ordering}`
            this.axios.get(`https://${this.currentMangaHost}/api/v3/comics?free_type=1${tag}&_update=true`)
            .then((res) => {
                console.log(res)
                this.mangaPage = res.data.results.limit + res.data.results.offset
                this.mangaList = res.data.results.list
                // this.recs = res.data.results
            })
            .catch((err) => {
                console.log(err)
            })
        },
        getMangaUpdate(){
            console.log('getMangaUpdate');
            this.loadRecs = 0
            // /api/v3/comic2/nvpengyoujiewoyixia?platform=1
            this.recs.list.forEach((item, index) => {
                let pathName = item.comic.path_word
                let params = `/api/v3/comic2/${pathName}?platform=1`
                this.axios.get(`https://${this.currentMangaHost}${params}`)
                .then((res) => {
                    let lastChar = res.data.results.comic.last_chapter.name
                    let lastTime = res.data.results.comic.datetime_updated
                    this.recs.list[index].comic.last_chapter = lastChar
                    this.recs.list[index].comic.datetime_updated = lastTime
                    this.loadRecs += 1
                    // console.log( this.recs.list[index].comic )
                })
                .catch((err) => {
                    console.log(err)
                })
            })
        },
        clickBanner(index, path, uuid){
            console.log(index, path, uuid)
        },
        hotNum(num) {
            if (num >= 1e3 && num < 1e4) {
                return (num / 1e3).toFixed(1) + 'k'
            }
            else if (num >= 1e4) {
                return (num / 1e4).toFixed(1) + 'w'
            }
            else {
                return num
            }
        },
        themeName(name) {
            if(name.length<3){
                return name+'\xa0\xa0'
            }else {
                return name
            }
        },
        clickTheme(index, path_word) {
            if (index == 'all') {
                this.filter.theme = index
                this.activeTheme = 0
            }
            else if (!isNaN(index)) {
                this.filter.theme = path_word
                this.activeTheme = index + 1
            } 
            else if (index == 'more') {
                this.filter.theme = 'more'
                this.activeTheme = 99
            }
            console.log(`fun=clickTheme -> [filter] theme=${this.filter.theme} datetime=${this.filter.ordering}`)
            this.getMangaLists()
            return
        },
        clickOrdering(index) {
            let order = '-'
            if(index == 'datetime_updated') {
                if(this.activeOrdering == 'datetime_updated') {
                    this.activeOrderingType.datetime_updated = this.activeOrderingType.datetime_updated == 0 ? 1 : 0
                }
                order = this.activeOrderingType.datetime_updated == 0 ? '-' : ''
                this.activeOrdering = 'datetime_updated'
            }
            else if(index == 'popular') {
                if(this.activeOrdering == 'popular') {
                    this.activeOrderingType.popular = this.activeOrderingType.popular == 0 ? 1 : 0
                }
                order = this.activeOrderingType.popular == 0 ? '-' : ''
                this.activeOrdering = 'popular'
                
            }
            this.filter.ordering = `${order}${this.activeOrdering}`
            console.log(`fun=clickOrdering -> [filter] theme=${this.filter.theme} datetime=${this.filter.ordering}`)
            this.getMangaLists()
            return
        },
    },
    computed: {
        ...mapState([
            "currentMangaHost", 
            'defaultLocalUrl', 
            'mangaHostGroup'
        ]),
    },
    watch: {
        // activeTheme(newVal,oldVal){
        //     console.log(newVal, oldVal);
        // }
    }
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
            position: relative;
            &>.van-icon {
                position: absolute;
                top: 50%;
                transform: translateY(-50.5%);
            }
        }
        &>button:last-child {
            padding: 0;
            border: 0;
            background-color: rgba(0, 0, 0, 0);
            color: #777777;
            line-height: 1.8rem;
        }
        .loading {
            animation: 2s loading 1;
        }
        @keyframes loading {
            0%{transform: rotateZ(0deg);}
            100%{transform: rotateZ(360deg);}
        }
    }
    .recsItems {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        &>div {
            width: 32%;
            border-radius: 5px;
            background-color: #2E2E2E;
            .recsItems_img {
                height: 10.2rem;
                overflow: hidden;
                position: relative;
                border-radius: 5px 5px 0 0;
                background-color: #333333;
                &>.recsItems_pop {
                    position: absolute;
                    padding: 1px 6px;
                    top: 0;
                    right: 0;
                    font-size: 12px;
                    color: #BBBBBB;
                    border-radius: 0 4px 0 5px;
                    background-color: rgba($color: #000000, $alpha: 0.75);
                }
                &>.recsItems_time {
                    position: absolute;
                    padding: 1px 6px;
                    bottom: 0;
                    left: 0;
                    font-size: 12px;
                    color: #BBBBBB;
                    border-radius: 0 5px 0 0;
                    background-color: rgba($color: #000000, $alpha: 0.75);
                }
            }
            .recsItems_info {
                padding: 0.35rem 0.35rem 0.6rem;
                color: #BBBBBB;
                // overflow: hidden;
                &>div:first-child {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    font-size: 1.15rem;
                    line-height: 1.3rem;
                    // background-color: red;
                    height: 2.6rem;
                    margin-bottom: 0.3rem;
                }
                &>div:nth-child(2) {
                    // color: blue;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.3rem;
                    &>span:first-child {
                        // width: 3rem;
                        white-space: nowrap;
                    }
                    &>span:last-child {
                        overflow: hidden;
                        height: 1.358rem;
                        white-space: nowrap;
                        text-overflow: none;
                    }
                }
                &>.mangaTheme {
                    box-sizing: border-box;
                    font-size: 0.85rem;
                    padding: 0.15rem 0.29rem;
                    margin-right: 0.35rem;
                    // margin-bottom: 2rem;
                    color: white;
                    background-color: #A6A6A6;
                    // border: 1px solid rgba($color: #000000, $alpha: 0);
                    border-radius: 0.15rem;
                }
            }
        }
    }
}
.allManga {
    .allMangaTitle {
        margin-bottom: 0.75rem;
        display: flex;
        justify-content: space-between;
        &>div:first-child {
            color: #BBBBBB;
            font-size: 1.2rem;
            position: relative;
            &>.van-icon {
                position: absolute;
                top: 50%;
                transform: translateY(-50.5%);
            }
        }
    }
    .allMangaFilter {
        padding: 0.72rem 1rem;        
        background-color: #2E2E2E;
        border-radius: 5px;
        &>.van-swipe {
            padding-bottom: 0.35rem;
            margin-bottom: 0.5rem;
            color: #A6A6A6;
            border-bottom: 1px solid #3b3b3b;
            .van-swipe-item {
                width: 3.5rem !important;
            }
            .van-swipe-item:nth-last-child(3) {
                width: 3.4rem !important;
            }
            .van-swipe-item:nth-last-child(2) {
                width: 6.5rem !important;
            }
            .longerItem {
                width: 4.5rem !important;
            }
            .activeTheme {
                color: #C81313;
            }
        }
        .allMangaOrdering {
            // background-color: aquamarine;
            display: flex;
            justify-content: space-between;
            &>div {
                padding: 0.35rem;
                width: 45%;
                text-align: center;
                color: #777777;
                background-color: #3b3b3b;
                border-radius: 1000px;
            }
            .activeOrdering {
                color: #2E2E2E !important;
                background-color: #777777 !important;
            }
        }
    }
    
}
</style>
