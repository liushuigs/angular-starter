var config = require('../config')
if (!config.tasks.js) {
  return
}

var gulp = require('gulp')
var gulpIf = require('gulp-if')
var eslint = require('gulp-eslint')
var path = require('path')


var jsSrc = path.join(config.root.src, config.tasks.js.src, '**/*.js')
var fixJsDst = path.join(config.root.src, config.tasks.js.src)

function isFixed(file) {
    // Has ESLint fixed the file contents?
  return file.eslint !== null && file.eslint.fixed
}

var lintTask = function () {
  return gulp.src([jsSrc])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint({
          fix: true
        }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // Automatically apply fixes
        .pipe(gulpIf(isFixed, gulp.dest(fixJsDst)))
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError())
}

gulp.task('lint', lintTask)
module.exports = lintTask
