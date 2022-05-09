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
    // proxy:{
    //   '/api': {
    //     target: 'https://mapi.hotmangasg.com:12001/api/v3',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  }
})
