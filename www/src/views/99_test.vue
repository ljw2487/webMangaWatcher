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
        <button @click="getsetu">rank</button>
        <button @click="getLoli">tag</button>
        <div
            class="class1"
            :class=" selected==activited ? 'class2' : '' "
        >666</div>
        <!-- <van-image
            :src="imgUrl"
        /> -->
        <img :src="imgUrl" alt="" style="width: 100px; height: 100px; background-color: brown;">
        <!-- <img referer="https://pixivic.com/" src="https://o.acgpic.net/img-original/img/2022/05/10/00/23/01/98238060_p0.jpg"> -->
    </div>
</template>

<script>
import { mapState } from "vuex"
    export default {
        data() {
            return {
                loading: true,
                selected: true,
                activited: true,
                imgUrl: '',
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
            getsetu() {
                // From: https://pixivic.com/
                // Host: https://api.huisq.site/ranks?page=1&date=2022-05-13&mode=day&pageSize=30
                let date = new Date(new Date().setDate(new Date().getDate() - 2)) // 两天前
                let month = date.getMonth()+1
                let dateFormat = `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${date.getDate()}`
                this.axios.get(`${this.defaultLocalUrl}/pixiv/rank`, {
                    params:{
                        page: 1,
                        date: dateFormat,
                        mode: "day",
                        pageSize: 10
                    }
                })
                .then(res => {
                    let data = res.data.data
                    let totalNum = data.length
                    let selectedNum = Math.ceil(Math.random()*totalNum)
                    if (selectedNum > 1) selectedNum = selectedNum-2
                    let imgUrl = data[selectedNum].imageUrls[0]
                    if (data[selectedNum].height <= 1920) {
                        imgUrl = imgUrl.original
                    } else {
                        imgUrl = imgUrl.large
                    }
                    let arr = imgUrl.split('i.pximg.net')
                    let finalUrl
                    if (arr.length == 2) {
                        finalUrl = `${arr[0]}i.pixiv.cat${arr[1]}`
                    } else {
                        console.log('Url错误', arr)
                        finalUrl = 'https://i.pixiv.cat/img-original/img/2022/05/07/01/53/50/98160193_p0.jpg'
                    }
                    arr = undefined
                    console.log(
                        'Rank:',
                        totalNum,
                        selectedNum, 
                        `[pid:${data[selectedNum].id}], [title:${data[selectedNum].title}]`
                    )
                    // this.imgUrl = finalUrl
                    let pixivCat = finalUrl
                    this.getImgURL(pixivCat)
                })
                .catch(err => {
                    console.error(err); 
                })
            },
            getLoli() {
                this.axios.get(`${this.defaultLocalUrl}/pixiv/lolicon`, {
                    params: {
                        tag: [
                            "ロリ|萝莉|贫乳",
                            "白丝|黑丝"
                        ],
                        size: "regular",
                    }
                })
                .then((res) => {
                    // this.imgUrl = res.data.data[0].urls.regular
                    let pixivCat = res.data.data[0].urls.regular
                    console.log(
                        'Lolicon:',
                        `[pid:${res.data.data[0].pid}], [title:${res.data.data[0].title}]`
                    )
                    this.getImgURL(pixivCat)
                })
                .catch((err) => {
                    console.error(err)
                })
            },
            getImgURL(imgUrl){
                console.log(imgUrl)
                this.axios.post(`${this.defaultLocalUrl}/pixiv/imgurl`, {
                    url: imgUrl,
                    host: 'pixiv-image-tc.pwp.link',
                },{
                    responseType: 'arraybuffer',
                })
                .then(res=> {
                    console.log(res)
                    // let binaryData = []
                    // binaryData.push(res.data)
                    // let resUrl = window.URL.createObjectURL(new Blob(binaryData))
                    let resUrl = window.URL.createObjectURL(new Blob([res.data]))
                    console.log(resUrl)
                    // this.imgUrl = resUrl.split('blob:')[1]
                    // let resUrl = URL.createObjectURL(res.data)
                })
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
.class1 {
    width: 100px;
    height: 100px;
}
.class2 {
    background-color: greenyellow;
}
</style>