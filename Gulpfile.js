process.title = 'gulp';

/**
 * Dependencies
 */
var path    = require('path')
,   del     = require('del')
,   gulp    = require('gulp')
,   acetate = require('acetate')
,   queue   = require('streamqueue');

/**
 * Plugins/Setup
 */
var $ = {
  postcss:    require('gulp-postcss'),
  concat:     require('gulp-concat'),
  nodemon:    require('gulp-nodemon'),
  livereload: require('gulp-livereload')
};

/**
 * Tasks
 */
gulp.task('clean', function (done) {
  return del([
    'build/**/*'
  ], done);
});

gulp.task('build:pages', function () {
  return acetate({
    config: 'config/acetate.js'
  });
});

gulp.task('build:css', function () {
  return gulp.src('src/assets/css/app.css')
    .pipe($.postcss([
      require('postcss-import')({
        from: 'src/_assets/css'
      }),
      require('postcss-mixins'),
      require('postcss-nested'),
      require('lost'),
      require('autoprefixer')({ browsers: ['last 1 version'] })
    ]))
    .pipe(gulp.dest('build/assets/css'));
});

gulp.task('build:js', function () {
  var lib  = gulp.src('src/assets/js/vendor/*.js')
  ,   incl = gulp.src('src/assets/js/includes/*.js')
  ,   app  = gulp.src('src/assets/js/app.js')

  return queue({ objectMode: true }, lib, app, incl)
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('build/assets/js'));
});

gulp.task('build:img', function () {
  return gulp.src('src/assets/img/*')
    .pipe(gulp.dest('build/assets/img'));
});

gulp.task('build:sounds', function () {
  return gulp.src('src/assets/sounds/**/*')
    .pipe(gulp.dest('build/assets/sounds'));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.html', ['build:pages']);
  gulp.watch('src/**/*.css', ['build:css']);
  gulp.watch('src/**/*.js', ['build:js']);
  gulp.watch('src/assets/sounds/*', ['build:sounds']);
  gulp.watch('build/**/*').on('change', $.livereload.changed);
});

gulp.task('serve', function () {
  $.livereload.listen();
  return $.nodemon({
    script: 'app.js'
  });
});

gulp.task('dev', [
  'serve',
  'build:css',
  'build:js',
  'build:img',
  'build:sounds',
  'build:pages',
  'watch'
]);

gulp.task('build', [
  'build:css',
  'build:js',
  'build:img',
  'build:sounds',
  'build:pages',
]);
