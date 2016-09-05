var gulp = require('gulp')

var schemaTask = function() {
  gulp.src([
    "./src/javascripts/schemas/*",
  ]).pipe(gulp.dest('./public/schema/'))
}

gulp.task('schema', schemaTask)
module.exports = schemaTask