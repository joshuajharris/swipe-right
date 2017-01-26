'use strict'

const gulp = require('gulp')
const babel = require('gulp-babel')
const path = require('path')

gulp.task('compile', () => {
  gulp.src(path.join('lib', '**', '*.js'))
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('build', ['compile'])
