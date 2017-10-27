const gulp      = require('gulp'),
      sass      = require('gulp-sass'),
      minifyCSS = require('gulp-clean-css'),
      uglify    = require('gulp-uglify'),
      rename    = require('gulp-rename'),
      changed   = require('gulp-changed');

const SCSS_SOURCE = './src/assets/**/*.scss';
const SCSS_DEST = './src/assets/css';

// Compile SCSS
gulp.task('compile_scss', function() {
  gulp.src('./src/assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(changed(SCSS_DEST))
    .pipe(gulp.dest(SCSS_DEST))
});

// detect changes in SCSS
gulp.task('watch_scss', function() {
  gulp.watch(SCSS_SOURCE, ['compile_scss']);
});

// config default tasks
gulp.task('default', ['watch_scss']);

// create DB
const DB_NAME = 'walmart';
const conn = {
  host: '127.0.0.1',
  charset: 'utf8',
};

gulp.task('migrate:createdb', () => {
  const knex = require('knex')({client: 'postgresql', connection: conn});
  return knex.raw(`CREATE DATABASE ${DB_NAME}`)
     .catch(console.error)
     .then(knex.destroy)
     ;
});

// drop DB
gulp.task('migrate:dropdb', () => {
  const knex = require('knex')({client: 'postgresql', connection: conn});
  return knex.raw(`DROP DATABASE IF EXISTS ${DB_NAME}`)
     .catch(console.error)
     .then(knex.destroy)
     ;
});

// migrate DB
gulp.task('migrate:latest', () => {
  const config = require('./knexfile'),
        env    = 'development',
        knex   = require('knex')(config[env]);

  return knex.migrate.latest({
    directory : './migrations'
  })
  .catch(console.error)
  .then(knex.destroy)
  ;
})
