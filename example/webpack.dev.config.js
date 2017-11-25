
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const project = require('./project.config')
const webpackConfig = require('./webpack.config')

const scssLoader = [
  {
    loader: 'css-loader?minimize',
    options: {
      sourcemap: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      autoprefixer : {
        add      : true,
        remove   : true,
        browsers : ['last 2 versions']
      }
    }
  },
  {
    loader: 'sass-loader',
    options: {
      sourcemap: true
    }
  }
]

webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)

webpackConfig.module.rules.push(
  {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: scssLoader,
    })
  }
)

module.exports = Object.assign(webpackConfig, {
  devServer: {
    contentBase: path.join(__dirname, project.outDir),
    compress: false,
    hot: true,
    port: 3000,
    historyApiFallback: true,
    publicPath: project.publicPath
  }
})