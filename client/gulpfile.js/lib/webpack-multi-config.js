var config = require('../config')

var path = require('path')
var webpack = require('webpack')
var WebpackManifest = require('./webpackManifest')
var _ = require('lodash')

module.exports = function (env) {
  var jsSrc = path.resolve(config.root.src, config.tasks.js.src)
  var jsDest = path.resolve(config.root.dest, config.tasks.js.dest)
  var publicPath = path.join(config.tasks.js.dest, '/')
  var filenamePattern = env === 'production' ? '[name]-[hash].js' : '[name].js'
  var extensions = config.tasks.js.extensions.map(function (extension) {
    return '.' + extension
  })

  var webpackConfig = {
    context: jsSrc,
    plugins: [],
    resolve: {
      root: [jsSrc],
      extensions: [''].concat(extensions)
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    }
  }

  if (env === 'test') {
  } else {
    // Karma doesn't need entry points or output settings
    webpackConfig.entry = config.tasks.js.entries

    webpackConfig.output = {
      path: path.normalize(jsDest),
      filename: filenamePattern,
      publicPath: publicPath
    }

    if (config.tasks.js.extractSharedJs) {
      // Factor out common dependencies into a shared.js
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: 'shared',
          filename: filenamePattern
        })
      )
    }
  }

  if (env === 'development') {
    // Source maps don't seem to work right now.
    // webpackConfig.devtool = 'source-map'
    webpackConfig.watch = true
    webpack.debug = true
  }

  if (env === 'production') {
    webpackConfig.plugins.push(
      new WebpackManifest(publicPath, config.root.dest),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin()
    )
  }

  // Makes ENV available in browser code.
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(process.env.ENV)
      }
    })
  )

  return webpackConfig
}
