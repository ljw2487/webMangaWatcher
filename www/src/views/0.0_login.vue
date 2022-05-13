<template>
    <div class="backPic" :style="{backgroundImage: `url(${backImgUrl})`}">
        <div style="padding-top: 150px">
            <div class="logo" style="background-color: red; width:120px; height:120px; margin: 0 auto; border-radius: 1000px">XX</div>
            
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
    export default {
        data() {
            return {
                backImgUrl: '',
            }
        },
        created () {
            // if (this.loginPageBackImgUrl == '') {
            //     this.getBackImgUrl()
            // }
            this.axios.get(`${this.defaultLocalUrl}/setutime`, { 
                params: {
                    tag: "ロリ|萝莉|贫乳",
                    size: "regular",
                },
            })
            .then((res) => {
                this.backImgUrl = res.data.data[0].urls.regular
                console.log(res)
                console.log(this.backImgUrl)
            })
            .catch((err) => {
                console.error(err)
            })
        },
        mounted () {
            
        },
        methods: {
            ...mapMutations([
                'getBackImgUrl', //also supports payload `this.nameOfMutation(amount)` 
            ]),
        },
        computed: {
            ...mapState([
                'loginPageBackImgUrl',
                'defaultLocalUrl',
            ])
        },
    }

</script>

<style lang="scss" scoped>
.backPic {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #2e2e2e;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;
    
}
.backPic::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(36, 36, 36, 0.8);
}
</style>