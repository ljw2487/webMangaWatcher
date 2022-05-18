<template>
    <!-- <div class="backPic" :style="{backgroundImage: `url(${backImgUrl})`}"> -->
        <div class="background">
            <div class="logo">XX</div>
            <div class="loginForm">
                <van-form @submit="onSubmit">
                    <van-field
                        v-model="username"
                        name="用户名"
                        label=""
                        left-icon="smile-o"
                        placeholder="用户名/邮箱"
                        :rules="[{ required: true, message: '请填写用户名或邮箱' }]"
                    />
                    <van-field
                        v-model="password"
                        type="password"
                        name="密码"
                        label=""
                        left-icon="smile-o"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                    />
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">注册</van-button>
                        <van-button round block type="info" native-type="submit">登录</van-button>
                    </div>
                </van-form>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import { mapState, mapMutations } from "vuex"
    export default {
        data() {
            return {
                username: '',
                password: '',
            }
        },
        created () {
            // if (this.loginPageBackImgUrl == '') {
            //     this.getBackImgUrl()
            // }
            // this.axios.get(`${this.defaultLocalUrl}/setutime`, { 
            //     params: {
            //         tag: "ロリ|萝莉|贫乳",
            //         size: "regular",
            //     },
            // })
            // .then((res) => {
            //     this.backImgUrl = res.data.data[0].urls.regular
            //     console.log(res)
            //     console.log(this.backImgUrl)
            // })
            // .catch((err) => {
            //     console.error(err)
            // })
        },
        mounted () {
            
        },
        methods: {
            ...mapMutations([
                'getBackImgUrl', //also supports payload `this.nameOfMutation(amount)` 
            ]),
            onSubmit(values) {
                console.log('submit', values);
            },
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
// .backPic {
//     position: relative;
//     width: 100%;
//     height: 100%;
//     background-color: #2e2e2e;
//     background-size: cover;
//     background-repeat: no-repeat;
//     background-position: top center;
    
// }
// .backPic::before {
//     content: '';
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(36, 36, 36, 0.8);
// }
.background {
    background-color: #2E2E2E;
    padding-top: 11rem;
    padding-left: 1rem;
    padding-right: 1rem;
    // width: 100%;
    height: 100%;
}
.loginForm {
    background-color: #777777;
    .van-form {
        &div>:first-child {
            background-color: #2E2E2E !important;
            padding-bottom: 1rem !important;
        }
    }
}
</style>