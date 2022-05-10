<template>
    <div>
        <van-tabbar v-model="active" active-color="#BBBBBB" inactive-color="#BBBBBB">
            <van-tabbar-item to="/index">
                <span>首页</span>
                <template #icon="props">
                    <van-icon
                        class="iconfont"
                        class-prefix="van-icon"
                        :name="props.active ? 'home' : 'home-o'"
                        size="23"
                    />
                </template>
            </van-tabbar-item>
            <van-tabbar-item to="/bookShelf">
                <span>书架</span>
                <template #icon="props">
                    <van-icon
                        class="iconfont"
                        class-prefix="van-icon"
                        :name="props.active ? 'book' : 'book-o'"
                        size="23"
                    />
                </template>
            </van-tabbar-item>
            <van-tabbar-item to="/myPage">
                <span>我的</span>
                <template #icon="props">
                    <van-icon
                        class="iconfont"
                        class-prefix="van-icon"
                        :name="props.active ? 'my' : 'my-o'"
                        size="23"
                    />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // active: 0,
            }
        },
        computed: {
            active: {
                get() {
                    switch (this.$route.path) {
                        case '/index':
                            return 0
                        case '/bookShelf':
                            return 1
                        case '/myPage':
                            return 2
                        default:
                            break
                    }
                },
                set(){}
            }
        }
    }
</script>

<style lang="scss" scoped>
.van-tabbar {
    background-color: #2E2E2E !important;
}
.van-tabbar::after {
    border: 0 !important;
    box-shadow: 0px -1px 10px 0px #1b1b1b !important;
}
.van-tabbar-item--active {
    background-color: rgba($color: #000000, $alpha: 0) !important;
}
</style>