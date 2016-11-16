'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var parser = require('./parser');
gulp.task('moveJSLibs', function () {
    gulp.src([
            'bower_components/jquery/dist/jquery.min.js'
        ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('./static/public/js'));
});

gulp.task('moveCSSLibs', function () {
    gulp.src([

        ])
        .pipe(concat('libs.css'))
        .pipe(gulp.dest('./public/static/css'));
});

gulp.task('moveJS', function () {
    gulp.src('./public/js/**/*.js')
        .pipe(concat('static.js'))
        .pipe(gulp.dest('./public/static/js'));
});

gulp.task('moveImg', function () {
    gulp.src('./public/img/**/*')
        .pipe(gulp.dest('./public/static/img'));
});

gulp.task('jade', function() {
    gulp.src('./public/jade/**/*.jade')
        .pipe(jade({
            pretty: true,
        }))
        .pipe(parser())
        .pipe(gulp.dest('./public/json'));
});
gulp.task('sass', function () {
    gulp.src('./public/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./public/static/css'));
});


gulp.task('build', ['moveJSLibs', 'moveCSSLibs', 'moveJS', 'moveImg','sass', 'jade']);

gulp.task('watch', function () {
    gulp.watch('./public/sass/**/*.scss', ['sass']);
    gulp.watch('./public/js/**/*.js', ['moveJS']);
    gulp.watch('./public/img/**/*', ['moveImg']);
    gulp.watch('./public/jade/**/*.jade', ['jade']);
});