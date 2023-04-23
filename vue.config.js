const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target: 'https://e-childschoolinfo.moe.go.kr',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api/notice/basicInfo.do'
        },
      },
      '/mediate/rest/cpmsapi030/cpmsapi030': {
        target: 'http://api.childcare.go.kr',
        changeOrigin: true,
        headers: {
          Host: 'api.childcare.go.kr'
        }
      }
    }
  },
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  }
})
