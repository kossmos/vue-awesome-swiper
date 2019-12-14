
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./base.conf')

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = merge(baseConfig, {
  entry: {
    'vue-awesome-swiper': './src/index.js'
  },
  externals: {
    '@modulbank/swiper/package/js/swiper.js': {
        root: 'Swiper',
        commonjs: '@modulbank/swiper/package/js/swiper.js',
        commonjs2: '@modulbank/swiper/package/js/swiper.js',
        amd: 'swiper'
    },
    'object-assign': 'object-assign'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
    library: 'VueAwesomeSwiper',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: '#source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'swiper$': '@modulbank/swiper/package/js/swiper.js'
    }
  }
})
