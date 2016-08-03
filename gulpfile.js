var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minify = require('gulp-minify-css');

gulp.task('scripts', function() {
  gulp.src([
  		'./bower_components/jquery/dist/jquery.js',
      './bower_components/velocity/velocity.js',
  		'./bower_components/angular/angular.js',
  		'./bower_components/angular-resource/angular-resource.js',
  		'./bower_components/angular-route/angular-route.js',
  		'./bower_components/lumx/dist/lumx.js',
  		'./scripts/**'
	])
    .pipe(concat('all.js'))
   // .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
});

gulp.task('css', function() {
  gulp.src([
  		'./css/main.css',
  		'./bower_components/lumx/dist/lumx.css'
	])
    .pipe(concat('all.css'))
    .pipe(minify())
    .pipe(gulp.dest('./dist/css/'))
});