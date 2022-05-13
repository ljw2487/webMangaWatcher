const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // '@search-padding': '0px @padding-sm',
            // '@search-background-color': '#0f0f0f',
          }
        }
      }
    }
  },
  devServer: {
    proxy: {
      // '/setu': { //这里最好有一个 /
      //   target: 'https://api.lolicon.app/setu', // 后台接口域名
      //   // ws: true, //如果要代理 websockets，配置这个参数
      //   // secure: false, // 如果是https接口，需要配置这个参数
      //   changeOrigin: true, //是否跨域
      //   pathRewrite:{
      //     '^/setu':''
      //   }
      // }
    }
  }
})
