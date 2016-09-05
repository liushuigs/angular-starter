var config = require('../config')
if (!config.tasks.html) {
  return
}

var browserSync = require('browser-sync')
var data = require('gulp-data')
var gulp = require('gulp')
var gulpif = require('gulp-if')
var handleErrors = require('../lib/handleErrors')
var htmlmin = require('gulp-htmlmin')
var path = require('path')
var replace = require('gulp-replace');
// var render = require('gulp-nunjucks-render')
var fs = require('fs')
var R = require('ramda')

var exclude = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**')

var paths = {
  src: [path.join(config.root.src, config.tasks.html.src, '/**/*.html'), exclude],
  dest: path.join(config.root.dest, config.tasks.html.dest)
}

var getData = function (file) {
  var pathObj = path.parse(file.path)

  // For each page asdf.html, we'll grab the src/html/data/asdf.json file
  // TODO: This doesn't actually work; only the global data is
  // accessible by the page. We might need to pass to the data:
  // parameter somehow.
  var pageSpecificDataPath = path.resolve(
    config.root.src,
    config.tasks.html.src,
    'data/',
    [pathObj.name, '.json'].join('')
  )
  var globalDataPath = path.resolve(
    config.root.src,
    config.tasks.html.src,
    config.tasks.html.dataFile)

  // Include json objects if they exist.
  var existingDataPaths = R.filter(function (dataPath) {
    try {
      fs.statSync(dataPath)
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false
      }
    }
    return true
  }, [globalDataPath, pageSpecificDataPath])

  var parseJSON = function (filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  }
  var getJSONFromPaths = R.compose(
    R.mergeAll, R.flatten, R.map(parseJSON))

  return getJSONFromPaths(existingDataPaths)
}

var htmlTask = function () {
  var nunjucksOptions = {
    path: [path.join(config.root.src, config.tasks.html.src)],
    manageEnv: function (environment) {
      environment.addFilter('shorten', function (str, count) {
        return str.slice(0, count || 5)
      })

      // Nunjucks autoescapes all output by default, so by just
      // running any output through it once, we're already escaping
      // the output. So if we use the built-in 'escape' filter,
      // the output is actually escaped twice.
      environment.addFilter('escapeonce', function (str) {
        return str
      })
    }
  }
  var isIndexHtml = function(file) {
    return file.path.indexOf('templates/index.html') > -1
  }

  return gulp.src(paths.src)
    .pipe(data(getData))
    .on('error', handleErrors)
    // .pipe(render(nunjucksOptions))
    .on('error', handleErrors)
    .pipe(gulpif(process.env.ENV === 'production', htmlmin(config.tasks.html.htmlmin)))
    .pipe(gulpif(isIndexHtml, replace(/RD_VERSION/g, +new Date())))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('html', htmlTask)
module.exports = htmlTask
