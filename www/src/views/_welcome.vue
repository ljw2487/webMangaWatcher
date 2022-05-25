<template>
    <div class="background" :style="{backgroundImage: `url(${backImg})`}">
        <div class="type-nav">
            <van-image class="logo" :src="logoImg" />
        </div>
        <div class="mainBox type-box-1">
            
        </div>
        <button class="selectBtn">确认选择</button>
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
        this.logoImg = require('../assets/logo/logo-2-l-d.png')

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
.type-box-1 {
    backdrop-filter: saturate(180%) blur(6px);
    background-color: rgba(66,66,66,0.8);
    border-color: 
        hsla(0,0%,100%,.1) 
        hsla(0,0%,100%,.07) 
        hsla(0,0%,100%,.04);
    border-radius: 0.5rem;
    border-style: solid;
    border-width: 1px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2), 0 6px 6px rgba(0,0,0,0.2);
}
.type-nav {
    backdrop-filter: saturate(180%) blur(20px);
    background-color: rgba(33,33,33,0.8);
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
.background {
    position: relative;
    height: 100%;
    z-index: 1;
    text-align: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;
    &::after {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        background-color: black;
        opacity: 0.5;
        z-index: -1;
        width: 100%;
        height: 100%;
    }
    &>div:first-child {
        text-align: center;
        &>.logo {
            width: 8rem;
            padding: 0.6rem 0 0.2rem;
        }
    }
}
.mainBox {
    height: 300px;
    margin: 15rem 3rem 4rem 3rem;
}
.selectBtn {
    margin: 0 3rem;
    padding: 0.4rem 0;
    color: #A6A6A6;
    font-size: 1.2rem;
    background-color: rgba($color: #3B3B3B, $alpha: 1);
    border: 1px solid #3B3B3B;
    border-radius: 1000px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2), 0 6px 6px rgba(0,0,0,0.2);
}
</style>