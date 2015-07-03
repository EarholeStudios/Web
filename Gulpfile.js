process.title = 'gulp';

/**
 * Dependencies
 */
var del     = require('del')
,   gulp    = require('gulp')
,   acetate = require('acetate')
,   queue   = require('streamqueue');

/**
 * Plugins/Setup
 */
var $ = {
  postcss:    require('gulp-postcss'),
  concat:     require('gulp-concat'),
  csso:       require('gulp-csso'),
  rev:        require('gulp-rev'),
  revReplace: require('gulp-rev-replace'),
  uglify:     require('gulp-uglify'),
  cleanup:    require('gulp-cleanup'),
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
  var lib = gulp.src('src/assets/js/vendor/*.js')
  ,   app = gulp.src('src/assets/js/app.js')

  return queue({ objectMode: true }, lib, app)
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('build/assets/js'));
});

gulp.task('build:img', function () {
  return gulp.src('src/assets/img/*')
    .pipe(gulp.dest('build/assets/img'));
});

gulp.task('build:rev', [
  'build:css',
  'build:js',
  'build:img',
  'build:pages'
], function () {
  var css = gulp.src('build/**/*.css')
    .pipe($.csso());

  var js = gulp.src('build/**/*.js')
    .pipe($.uglify());

  var img = gulp.src([
    'build/**/*.jpg',
    'build/**/*.png',
    'build/**/*.gif'
  ]);

  return queue({ objectMode: true }, css, js, img)
    .pipe($.rev())
    .pipe(gulp.dest('build'))
    .pipe($.cleanup())
    .pipe($.rev.manifest())
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['build:rev'], function () {
  var manifest = gulp.src('build/rev-manifest.json');

  return gulp.src('build/**/*')
    .pipe($.revReplace({ manifest: manifest }))
    .pipe(gulp.dest('build'));
})

gulp.task('watch', function () {
  gulp.watch('src/**/*.html', ['build:pages']);
  gulp.watch('src/**/*.css', ['build:css']);
  gulp.watch('src/**/*.js', ['build:js']);
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
  'build:pages',
  'watch'
]);
