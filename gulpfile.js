'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const nightwatch = require('gulp-nightwatch');
const ignore = require('gulp-ignore');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');

gulp.task('nightwatch', () => {
  gulp.src('')
    .pipe(plumber())
    .pipe(nightwatch({
      configFile: 'nightwatch.conf.js'
    }));
});

gulp.task('nightwatch:w', ['nightwatch'], () => {
  gulp.watch(['{./,}bundles/**/*.js', '{./,}test-{e2e,nightwatch}/**/*.js'], ['nightwatch']);
});



gulp.task('tsc:rxjs', () => {
  const tsProject = ts.createProject('tsconfig.json', { noExternalResolve: true });
  return tsProject.src()
    .pipe(plumber())
    .pipe(ignore.include(['{./,}test-rxjs/**/*.ts']))
    // .pipe(ignore.exclude(['{./,}test-rxjs/spec/**/*.ts']))
    .pipe(ts(tsProject))
    .pipe(babel())
    .pipe(gulp.dest('.'));
});

gulp.task('mocha:rxjs', ['tsc:rxjs'], () => {
  gulp.src('test-rxjs/index.js', { read: false })
    .pipe(plumber())
    // gulp-mocha needs filepaths so you can't have any plugins before it 
    .pipe(mocha({
      reporter: 'spec',
      timeout: 5000
    }));
});

gulp.task('mocha:rxjs:w', ['mocha:rxjs'], () => {
  gulp.watch(['{./,}test-rxjs/**/*.ts', '{./,}test-rxjs/index.js'], ['mocha:rxjs']);
});