<!--

 * @Description: 

 * @Version: 1.0

 * @Autor: 322829

 * @Date: 2021-07-15 14:26:25

 * @FilePath: \vuets_admin\src\views\DataManage\ChartData.vue

 * @LastEditors: 322829

 * @LastEditTime: 2021-08-11 14:49:06

-->

<template>
    <div class="chart-data"></div>
</template>

<script>
export default {
    setup() {
        let ipInput = "192.168.1.123"
        let pings = () => {
            ping(ipInput)
        }
        const ping = (ip) => {
            var img = new Image()
            var start = new Date().getTime()
            let isFlag = false
            let isCloseWifi = true
            let isHasFinish = false

            img.onload = function () {
                if (!isHasFinish) {
                    isFlag = true

                    isHasFinish = true

                    alert("ping" + ip + "通过------------------")
                }
            }

            img.onerror = function () {
                if (!isHasFinish) {
                    if (!isCloseWifi) {
                        isFlag = true
                        alert("ping" + ip + "通过------------------")
                    }
                    isHasFinish = true
                }
            }

            setTimeout(function () {
                isCloseWifi = false
                console.log("network is working, start ping...")
            }, 2)

            img.src = "http://" + ip + "/" + start
            var timer = setTimeout(function () {
                if (!isFlag) {
                    isHasFinish = true
                    isFlag = false
                    console.log("Ping " + ip + " fail. ")
                    alert("ping" + ip + "失败！！！！！！！！！！！！！！！！")
                }
            }, 3000)
        }

        return { ipInput, pings }
    },
}
</script>

<style lang="scss" scoped></style>
