var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var autoprefixer = require("gulp-autoprefixer");

var browsers = [
    "last 1 version",
    "last 2 Chrome versions",
    "last 2 Firefox versions",
    "last 2 Opera versions",
    "last 2 Edge versions",
    "ie 11",
    "ie 10"    
];

gulp.task("style", function() {
  gulp.src("sass/style.scss")
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer({browsers: browsers}))
  .pipe(gulp.dest("css"));
});

gulp.task('watcher', function () {
  gulp.watch('./sass/**/*.scss', ['style']);
});