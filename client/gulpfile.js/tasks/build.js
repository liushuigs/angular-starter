var gulp = require('gulp')
var gulpSequence = require('gulp-sequence')
var getEnabledTasks = require('../lib/getEnabledTasks')

var buildTask = function (cb) {
  var tasks = getEnabledTasks('production')
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'static', cb)
}

gulp.task('build', buildTask)
module.exports = buildTask
