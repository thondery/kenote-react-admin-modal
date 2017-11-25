
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackConfig = require('./webpack.config')

const scssLoader = [
  {
    loader: 'css-loader?minimize',
    options: {
      sourcemap: true
    }
  },
  {
    loader: 'postcss-loader'
  },
  {
    loader: 'sass-loader',
    options: {
      sourcemap: true
    }
  }
]

webpackConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: !!webpackConfig.devtool,
    beautify: false,
    comments: false,
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
      drop_console: true,
      collapse_vars: true,
      reduce_vars: true,
    },
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin()
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

module.exports = webpackConfig