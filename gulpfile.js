const gulp      = require('gulp'),
      sass      = require('gulp-sass'),
      minifyCSS = require('gulp-clean-css'),
      uglify    = require('gulp-uglify'),
      rename    = require('gulp-rename'),
      changed   = require('gulp-changed');
      concat    = require('gulp-concat');

const SCSS_SOURCE = './src/assets/**/*.scss';
const SCSS_DEST = './src/assets/css';

// Compile SCSS
gulp.task('compile_scss', function() {
  gulp.src('./src/assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(concat('default.min.css'))
    .pipe(changed(SCSS_DEST))
    .pipe(gulp.dest(SCSS_DEST))
});

// detect changes in SCSS
gulp.task('watch_scss', function() {
  gulp.watch(SCSS_SOURCE, ['compile_scss']);
});
