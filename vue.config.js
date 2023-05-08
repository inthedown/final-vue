module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        //target: 'http://116.62.32.208:8080/', //接口的前缀
        target: 'http://localhost:8080/',
        ws: true, //代理websocked
        changeOrigin: true, //虚拟的站点需要更管origin
        pathRewrite: {
          '^/api': '', //重写路径
        },
      },
    },
  },
}
