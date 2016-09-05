var gulp = require('gulp')
var gulpSequence = require('gulp-sequence').use(gulp)
var getEnabledTasks = require('../lib/getEnabledTasks')

function defaultTask(cb) {
  var tasks = getEnabledTasks('watch')
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'static', 'schema', 'copy', 'watch', cb)
}

gulp.task('default', defaultTask)
module.exports = defaultTask
