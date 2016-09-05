var browserSync = require('browser-sync')
var config = require('../config')
var gulp = require('gulp')

function browserSyncTask() {
  browserSync.init(config.tasks.browserSync)
}
gulp.task('browserSync', browserSyncTask)
module.exports = browserSyncTask
