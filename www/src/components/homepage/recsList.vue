<template>
    <div>
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
    </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from "vuex"
import { Lazyload } from 'vant'
Vue.use(Lazyload)
export default {
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
    mounted() {
        this.getBannerAndRecs()
        this.getHotThemes()
        this.getMangaLists()
    },
    methods: {
        ...mapMutations([
            "updateMangaHostGroup"
        ]),
        name() {
            
        }
    },
    computed: {
        ...mapState([
            "currentMangaHost", 
            'defaultLocalUrl', 
            'mangaHostGroup'
        ]),
    },
    watch: {
    }
}
</script>

<style lang="scss" scoped>
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
</style>