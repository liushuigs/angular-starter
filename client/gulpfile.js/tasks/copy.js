var gulp = require('gulp')

var copyTask = function() {
  gulp.src([
    "./bower_components/angular-medium-editor/dist/*.min.js",
    "./bower_components/medium-editor/dist/js/*.min.js"
  ]).pipe(gulp.dest('./public/javascripts'))

  gulp.src([
    "./bower_components/medium-editor/dist/css/medium-editor.min.css",
    "./bower_components/medium-editor/dist/css/themes/roman.min.css"
  ]).pipe(gulp.dest('./public/stylesheets'))

  gulp.src([
    "./index.php",
  ]).pipe(gulp.dest('./public'))
}

gulp.task('copy', copyTask)
module.exports = copyTask