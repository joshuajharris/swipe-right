'use strict'

const gulp = require('gulp')
const babel = require('gulp-babel')
const path = require('path')
const gutil = require('gulp-util')
const plumber = require('gulp-plumber')

function onError(error) {
  gutil.log(error.message)
  this.emit('end')
}

gulp.task('compile', () => {
  gulp.src(path.join('lib', '**', '*.js'))
    .pipe(plumber({ errorHandler: onError }))
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', () => {
  gulp.watch(path.join('lib', '**', '*.js'), ['compile'])
})

gulp.task('build', ['compile'])
gulp.task('start', ['watch'])