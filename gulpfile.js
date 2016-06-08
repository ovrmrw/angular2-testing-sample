'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const nightwatch = require('gulp-nightwatch');
const ignore = require('gulp-ignore');

gulp.task('nightwatch', () => {
  gulp.src('')
    .pipe(plumber())
    .pipe(nightwatch({
      configFile: 'nightwatch.conf.js'
    }));
});

gulp.task('nightwatch:w', ['nightwatch'], () => {
  gulp.watch(['{./,}bundles/**/*.js', '{./,}test-nightwatch/**/*.js'], ['nightwatch']);
});