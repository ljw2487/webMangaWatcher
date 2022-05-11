<template>
    <div>
        <div class="abc">
            <div class="a"></div>
            <div class="b"></div>
            <div class="c"></div>
        </div>
        <div class="def">
            <div>abc</div>
            <div>def</div>
            <div>ghi</div>
        </div>
        <van-skeleton :row="1" :loading="loading">
            <div>实际内容</div>
        </van-skeleton>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: true,
            }
        },
        mounted() {
            this.loading = true;
        },
        methods: {
            getPing() {
                // setup() {
                //     let ipInput = "192.168.1.123"
                //     let pings = () => {
                //         ping(ipInput)
                //     }
                //     const ping = (ip) => {
                //         var img = new Image()
                //         var start = new Date().getTime()
                //         let isFlag = false
                //         let isCloseWifi = true
                //         let isHasFinish = false

                //         img.onload = function () {
                //             if (!isHasFinish) {
                //                 isFlag = true

                //                 isHasFinish = true

                //                 alert("ping" + ip + "通过------------------")
                //             }
                //         }

                //         img.onerror = function () {
                //             if (!isHasFinish) {
                //                 if (!isCloseWifi) {
                //                     isFlag = true
                //                     alert("ping" + ip + "通过------------------")
                //                 }
                //                 isHasFinish = true
                //             }
                //         }

                //         setTimeout(function () {
                //             isCloseWifi = false
                //             console.log("network is working, start ping...")
                //         }, 2)

                //         img.src = "http://" + ip + "/" + start
                //         var timer = setTimeout(function () {
                //             if (!isFlag) {
                //                 isHasFinish = true
                //                 isFlag = false
                //                 console.log("Ping " + ip + " fail. ")
                //                 alert("ping" + ip + "失败！！！！！！！！！！！！！！！！")
                //             }
                //         }, 3000)
                //     }
                //     return { ipInput, pings }
                // };
            },

        },
   
    }
</script>

<style lang="scss" scoped>
.abc {
    display: flex;
    justify-content: space-between;
    .a {
        width: 100px;
        height: 100px;
        background-color: blue;
    }
    .b {
        // width: 20px;
        background-color: rgb(255, 0, 0);
    }
    .c {
        width: 100px;
        height: 100px;
        background-color: rgb(0, 255, 21);
    }
}
.def {
    background-color: #777777;
    display: flex;
    &>div {
        width: 100px;
        text-align: center;
    }
}
</style>