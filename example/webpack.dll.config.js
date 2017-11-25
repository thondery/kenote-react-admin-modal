
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const project = require('./project.config')


const config = {
  entry: project.vendors,
  output: {
    path: path.join(__dirname, project.outDir),
    filename: '[name]_bundle.js',
    library: '[name]_bundle'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, project.manifest),
      name: '[name]_bundle',
      context: __dirname,
    }),
    new ExtractTextPlugin({
      filename: '[name]_bundle.css',
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
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
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory=true'
      },
      {
        test : /\.json$/,
        use : [
          'json-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader?minimize',
              options: {
                sourcemap: true
              }
            },
            {
              loader: 'postcss-loader'
            },
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]?[hash]'
        }
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]'
        }
      }
    ]
  }
}

module.exports = config