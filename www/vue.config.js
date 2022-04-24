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
  }
})
