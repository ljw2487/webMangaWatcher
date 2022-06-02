<template>
    <div class="background" :style="{backgroundImage: `url(${backImg})`}">
        <div class="type-box-2">
            <van-image class="logo" :src="logoImg" />
        </div>
        <div class="mainBox type-box-1">
            
        </div>
        <div 
            class="selectBtn" 
            @click="goHomePage"
        >
        <button>前往首页</button>
        </div>
    </div>
</template>

<script>
import { api_network } from "../api/api"
import { mapState } from 'vuex';

export default {
    data() {
        return {
            backImg: '', // 背景图
            logoImg: '', // logo图
            goHomeClicked: false, // 点击按钮变换样式
        }
    },
    created () {
        let date = parseInt(new Date().getDate() % 10)
        let backgroundImageName = `backImg_${date}`
        // require它是打包工具所需要的标识, 必须使用静态字符串，不能是变量，不过只要是path格式即可
        this.backImg = require('../assets/background/' + backgroundImageName + '.jpg')
        this.logoImg = require('../assets/logo/logo-2-l-d.png')    
    },
    mounted () {
        this.checkNetwork()
    },
    methods: {
        // API - 检查网络状态
        async checkNetwork () {
            let data = this.mangaHost.split(':')
            if (!data[1]) data.push('443')
            try {
                let res = await api_network(data)
                let hostGroup = res.results.api
                let hash = []
                hostGroup.forEach(item => {
                    item.forEach(url => {
                        hash.push(url)
                    })
                });
                console.log(hash)
            } catch (err) {
                console.log(err)
            }
        },
        goHomePage() {
            this.goHomeClicked = true
            console.log(1112121)
            this.goHomeClicked = false
        }
    },
    computed: {
        ...mapState([
            'mangaHost',
        ])
    },
}

</script>

<style lang="scss" scoped>
// type-box-1 在 all.css 里
// type-box-2 在 all.css 里

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
    margin: 15rem 1rem 2rem;
}
.selectBtn {
    position: relative;
    margin: 0 1rem;
    overflow: hidden;
    color: #A6A6A6;
    font-size: 1.2rem;
    background-color: rgba($color: #3B3B3B, $alpha: 1);
    border: 1px solid #3B3B3B;
    border-radius: 1000px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2), 0 6px 6px rgba(0,0,0,0.2);
    &>button {
        cursor: pointer;
        width: 100%;
        padding: 0.5rem 0;
        &:active {
            // background-color: rgba($color: rgb(75, 75, 75), $alpha: 0.6);
            animation: 1s loading 1 forwards ;
        }
        @keyframes loading {
            0%{background-color: rgba($color: #3B3B3B, $alpha: 0.6);}
            30%{background-color: rgba($color: rgb(75, 75, 75), $alpha: 0.6);}
            100%{background-color: rgba($color: rgb(75, 75, 75), $alpha: 0.6);}
        }
        // &::before {
        //     content: '';
        //     position: absolute;
        //     top: 50%;
        //     left: 50%;
        //     width: 1rem;
        //     height: 1rem;
        //     transform: translate(-50%, -50%) scale(0, 0);
        //     border-radius: 50%;
        //     background-color: rgba($color: rgb(75, 75, 75), $alpha: 0.6);
        //     transform-origin: center;
        //     transition: ease-in-out 0.5s;
        // }
        // &:hover::before {
        //     animation: 0.9s loading 1;
        // }
        // @keyframes loading {
        //     0%{transform: translate(50%, 50%) scale(2, 2);}
        //     100%{transform: translate(50%, 50%) scale(50, 50);}
        // }
    }
}

</style>