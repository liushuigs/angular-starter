var gulp = require('gulp')
var del = require('del')
var config = require('../config')

var cleanTask = function cleanTask(cb) {
  cb()
  //del([config.root.dest]).then(function () {
  //  cb()
  //})
}

gulp.task('clean', cleanTask)
module.exports = cleanTask
