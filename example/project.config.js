
const path = require('path')
const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  env          : NODE_ENV,
  __PROD__     : NODE_ENV === 'production',
  __DEV__      : NODE_ENV === 'development',
  globals      : {
    __DEAKTOP__ : false
  },
  basePath     : __dirname,
  srcDir       : 'src',
  outDir       : 'dist',
  publicPath   : '',
  sourcemaps   : true,
  manifest     : 'dll/[name]-manifest.json',
  vendors      : {
    'vendor_0': [
      'babel-polyfill',
      'react-hot-loader'
    ],
    'vendor_1': [
      'react',
      'react-dom'
    ]
  },
  entry        : {
    index: './index.js'
  },
  alias        : {
    containers     : path.resolve(__dirname, 'src/containers')
  }
}