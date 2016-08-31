"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var csscomb = require("gulp-csscomb");
var server = require("browser-sync");
var run = require("run-sequence");
var imagemin = require("gulp-imagemin");
var del = require("del");
var copy = require("gulp-copy");


var browsers = [
    "last 1 version",
    "last 2 Chrome versions",
    "last 2 Firefox versions",
    "last 2 Opera versions",
    "last 2 Edge versions",
    "ie 11",
    "ie 10",
    "ie 9"
];

gulp.task("del", function() {
    return del("build");
});

gulp.task("copy", function() {
    return gulp.src([
        "fonts/**/*.{woff,woff2}",
        "img/**",
        "js/**",
        "*.html"
    ], {
        base: "."
    }).pipe(gulp.dest("build"));
});

gulp.task('csscomb', function() {
    return gulp.src('css/style.css')
        .pipe(csscomb())
        .pipe(gulp.dest('css'));
});

gulp.task("svgmin", function () {
    return gulp.src("build/img/**/*.svg")
        .pipe(svgmin())
        .pipe(gulp.dest("build/img/"));
});

gulp.task("svgstore", function () {
    return gulp
        .src("build/img/*.svg")
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("spriteSvg.svg"))
        .pipe(gulp.dest("build/img/"));
});

gulp.task("svgstore:dev", function () {
    return gulp
        .src("img/**/*.svg")
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("spriteSvg.svg"))
        .pipe(gulp.dest("img/"));
});

gulp.task("images", function() {
    return gulp.src("build/img/**/*.{png,jpg,gif}")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true})
        ]))
        .pipe(gulp.dest("build/img"));
});

gulp.task("cssbuild", function() {
    gulp.src("sass/style.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({browsers: browsers}))
        .pipe(gulp.dest("build/css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"));
});

gulp.task("cssbuild:dev", function() {
    gulp.src("sass/style.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({browsers: browsers}))
        .pipe(gulp.dest("css"))
        .pipe(server.reload({stream: true}));
});

gulp.task("build", function() {
    run(
        "del",
        "copy",
        "svgstore",
        "cssbuild",
        "images"
    );
});

gulp.task('serve',["cssbuild:dev","svgstore:dev"], function () {
   server.init({
       server: ".",
       notify: false,
       open: true,
       ui: false
   });
    
    gulp.watch("sass/**/*.scss", ["cssbuild:dev"]);
    gulp.watch("*.html").on("change", server.reload);
    
});