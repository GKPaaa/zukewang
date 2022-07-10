const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // 修改显示在浏览器上的标题
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '租客王'
        return args
      })
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）  使用path.join拼接绝对路径
            hack: `true; @import "${path.join(__dirname, 'src/styles/theme.less')}";`
          }
        }
      }
    }
  }
})
