<template>
    <div>
        <van-nav-bar 
            @click-left="onClickLeft"
            @click-right="onClickRight"
            :fixed="true"
            :z-index="999"
        >
            <template #left>
                <van-icon 
                    class="iconfont"
                    class-prefix="van-icon"
                    :name="navIcon_left ? 'network' : 'network-o'" 
                    size="26" 
                    :color="iconColor" 
                />
            </template>
            <template #title>
                <van-search 
                    shape="round" 
                    v-model="value" 
                    placeholder="关键词搜索" 
                    @search="onSearch"
                    @input="onInput"
                    :clearable="false"
                >
                    <template #left-icon>
                        <van-icon name="search" :color="iconColor"  />
                    </template>
                    <template #right-icon v-if="hasTaxt">
                        <van-icon 
                            name="clear" 
                            :color="iconColor" 
                            @click="clickClearIcon"
                        />
                    </template>
                </van-search>
            </template>
            <template #right>
                <van-icon 
                    class="iconfont"
                    class-prefix="van-icon"
                    :name="navIcon_right ? 'tags' : 'tags-o'" 
                    size="28" 
                    :color="iconColor" 
                />
            </template>
        </van-nav-bar>
        <van-popup 
            v-model="navIcon_right"
            position="top"
            :style="{ height: '60%' }"
        >
            <div class="filter">
                <div class="filterTitle">显示方式</div>

                <van-row class="filterBody" type="flex">
                    <van-col 
                        span="6" 
                        v-for="item in style" 
                        :key="item[0]" 
                        @click="selectStyle(item)"
                        :class="{isSelected: filter.show === item[0]}"
                    >
                        <span>{{ item[1] }}&nbsp;</span>
                        <van-icon 
                            class="iconfont" 
                            class-prefix="van-icon" 
                            :name="item[2]"
                            size="12"
                        ></van-icon>
                    </van-col>
                </van-row>

                <div class="filterTitle">排序方式</div>

                <van-row class="filterBody" type="flex">
                    <van-col span="9">
                        <span>按更新时间&nbsp;</span>
                        <van-icon 
                            class="iconfont" 
                            class-prefix="van-icon" 
                            name="myArrow"
                            size="12"
                        ></van-icon>
                    </van-col>
                    <van-col span="7">
                        <span>按热度&nbsp;</span>
                        <van-icon 
                            class="iconfont" 
                            class-prefix="van-icon" 
                            name="myArrow"
                            size="10"
                        ></van-icon>
                    </van-col>
                </van-row>

            </div>
            <van-button >111111111111111111111111111</van-button>
        </van-popup>
        <van-popup 
            v-model="navIcon_left"
            position="top"
            :style="{ height: '60%' }"
        >
            <div class="filter">
                <div class="filterTitle">源状态查询</div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                iconColor: '#BBBBBB',
                value: '',
                hasTaxt: false,
                navIcon_left: false,
                navIcon_right: false,    // 默认是false
                // 显示方式 [序号，文本，图标名]
                style: [
                    [0, '单列', 'oneRow'], 
                    [1, '双列', 'twoRow'], 
                    [2, '三列', 'threeRow']
                ],
                // 排序方式
                ordering: ['按更新时间', '按热度'],
                filter: {
                    show: 1,
                    row: '',
                },
            }
        },
        methods: {
            onClickLeft() {
                console.log('left botton is clicked')
                this.navIcon_left = this.navIcon_left ? false : true
                if (this.navIcon_left == true && this.navIcon_right == true) {
                    // console.log('chufa');
                    this.navIcon_right = false
                }
            },
            onClickRight() {
                console.log('right botton is clicked')
                this.navIcon_right = this.navIcon_right ? false : true
                if (this.navIcon_right == true && this.navIcon_left == true) {
                    this.navIcon_left = false
                }
            },
            onSearch(val) {
                console.log('确定搜索')
                Toast(val);
            },
            onInput() {
                this.hasTaxt = this.value ? true : false
            },
            clickClearIcon() {
                this.value = ''
                this.onInput()
            },
            selectStyle(item) {
                this.filter.show = item[0]
                // console.log(item[0], this.filter);
            },
        },
        mounted() {
            console.log(this.defaultLocalUrl)
            
        },
        computed: {
            ...mapState([
                'defaultLocalUrl',
            ])
        },
        watch: {

        },
    }


</script>

<style lang="scss">
    /* #navbarCenter /deep/ .van-row--justify-space-between {
        width: 350px !important;
    } */
    /* ::v-deep .van-nav-bar__title {
        background-color: aqua !important;
        color: blue !important;
    } */
    .van-nav-bar {
        background-color: #2E2E2E !important;
    }
    .van-hairline--bottom::after {
        border-bottom-color: #BBBBBB !important;
    }
    .van-search {
        padding: 0 0 !important;
        background-color: #2E2E2E !important;
    }
    .van-search__content {
        background-color: #3B3B3B !important;
        input {
            color: #BBBBBB !important;
            // font-size: 1rem !important;
            &.van-field__control::-webkit-input-placeholder {
                color: #777777 !important;
            }
        }
    }
    .van-popup--top {
        z-index: 998 !important;
        background-color: #2E2E2E !important;
    }
    .filter {
        margin-top: 3.285rem; 
        padding: 0 1.14rem;
        & > .filterTitle {
            padding: 1.428rem 0 1.071rem;
            color: #BBBBBB;
            font-size: 1rem;
            font-weight: bold;
        }
        & > .filterBody {
            font-size: 12px;
            & > div {
                margin-left: 1rem;
                padding: 0 1.1rem 0 1.1rem;
                color: #BBBBBB;
                text-align: center;
                cursor: pointer;
                background-color: #3B3B3B;
                border-radius: 100px;
                & > span {
                    padding: 0.5rem 0;
                    display: inline-block;
                    line-height: 100%;
                };
                & > i {
                    padding: 0.5rem 0;
                }
            }
        }
        & .isSelected {
            font-weight: bold;
            color: #3B3B3B !important;
            background-color: #BBBBBB !important;
        }
    }
    .van-overlay {
        z-index: 997 !important;
        background-color: rgba(0, 0, 0, 0.1) !important;
    }
</style>