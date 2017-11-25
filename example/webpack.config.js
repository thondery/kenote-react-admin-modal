
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const fs = require('fs-extra')
const _ = require('lodash')
const project = require('./project.config')

const { __DEV__, __PROD__, globals } = project
const contextPath = globals.__DESKTOP__ ? '' : '/'

const getDllReferencePlugin = (items = null) => {
  let plugins = []
  for (let e of _.keys(project.vendors)) {
    plugins.push(
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(`./${project.manifest.replace(/\[name\]/, e)}`)
      })
    )
  }
  return _.concat(plugins, items)
}

const getAssets = (opts = null) => {
  opts = Object.assign({
    name: '[name].bundle', 
    css: true
  }, opts)
  let assets = []
  for (let e of _.keys(project.vendors)) {
    let isManifest = fs.existsSync(`./${project.manifest.replace(/\[name\]/, e)}`)
    if (isManifest) {
      let manifest = require(`./${project.manifest.replace(/\[name\]/, e)}`)
      for (let ext of ['js', 'css']) {
        fs.existsSync(`./${project.outDir}/${manifest.name}.${ext}`) && assets.push(`${contextPath+manifest.name}.${ext}`)
      }
    }
  }
  for (let e of _.keys(project.entry)) {
    let filename = opts.name.replace(/\[name\]/, e)
    assets.push(`${contextPath+filename}.js`)
    opts.css && assets.push(`${contextPath+filename}.css`)
  }
  return assets
}

const config = {
  context: path.resolve(__dirname, project.srcDir),
  cache: true,
  entry: project.entry,
  devtool: project.sourcemaps ? 'source-map' : false,
  output: {
    path: path.resolve(__dirname, project.outDir),
    filename: '[name].bundle.js',
    publicPath: project.publicPath
  },
  resolve: {
    modules: [
      path.resolve(__dirname, project.srcDir),
      'node_modules',
    ],
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: project.alias
  },
  plugins: getDllReferencePlugin([
    new webpack.DefinePlugin(Object.assign({
      'process.env': {
        'NODE_ENV': JSON.stringify(project.env)
      },
      __DEV__,
      __PROD__
    }, project.globals)),
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template : path.resolve(__dirname, project.srcDir, 'index.html'),
      filename : 'index.html',
      inject   : 'body',
      hash     : true,
      excludeChunks   : ['vendor', 'index'],
      minify   : {
        collapseWhitespace : false
      }
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: getAssets(),
      append: false,
      hash: true
    }),
    new LodashModuleReplacementPlugin
  ]),
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
          use: 'css-loader?sourceMap&-minimize'
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
    ],
  }
}

module.exports = config