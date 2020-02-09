'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var server = require('browser-sync').create();

gulp.task('css', function() {
    return gulp.src('source/sass/style.scss')
    .pipe(sass())
    .pipe(postcss([
        autoprefixer()
    ]))
    .pipe(csso())
    .pipe(gulp.dest('source/css'));
});

gulp.task('server', function() {
    server.init({
        server: 'source/'
    });

    gulp.watch("source/sass/**/*.scss", gulp.series("css")).on('change', server.reload);
    gulp.watch('source/index.html').on('change', server.reload);
});

gulp.task('go', gulp.series('css', 'server'));

