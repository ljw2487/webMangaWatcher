<template>
    <div class="background" :style="{backgroundImage: `url(${backImg})`}">
        <van-image class="logo" :src="logoImg" />
        <div class="mainBox">
            <div @onclick="abcd">
                123321
            </div>
            <!-- <div>
                123321
            </div> -->
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                backImg: '', // 背景图
                logoImg: '', // logo图
            }
        },
        created () {
            let date = parseInt(new Date().getDate() % 10)
            let backgroundImageName = `backImg_${date}`
            // require它是打包工具所需要的标识, 必须使用静态字符串，不能是变量，不过只要是path格式即可
            this.backImg = require('../assets/background/' + backgroundImageName + '.jpg')
            this.logoImg = require('../assets/logo/logo-1-m.png')
            // this.checkNetwork()
        },
        mounted () {
        },
        methods: {
            checkNetwork () {
            },
            abcd() {
                console.log(1112121)
            }
        }
    }
</script>

<style lang="scss" scoped>
.background {
    position: relative;
    padding: 1rem;
    height: 100%;
    // background-color: #2E2E2E;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;
    z-index: 0;
    &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        background-color: black;
        opacity: 0.8;
        z-index: 0;
        width: 100%;
        height: 100%;

    }
    &>.logo {
        width: 10rem;
        margin: 0 auto;
    }
    &>.mainBox {
        width: 100%;
        height: 300px;
        margin: 0 auto;
        align-items: center;
        // background-color: red;
        // background-color: rgba(60,60,60,0.8);
    }
}
</style>