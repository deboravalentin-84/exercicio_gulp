const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

// Importar plugins do imagemin
const mozjpeg = require('imagemin-mozjpeg');
const optipng = require('imagemin-optipng');
const svgo = require('imagemin-svgo');

// Tarefa para compilar SASS
gulp.task('sass', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css/'));
});

// Tarefa para comprimir imagens
gulp.task('images', function() {
  console.log('Iniciando compressão de imagens...');
  return gulp.src('src/images/*.{jpg,jpeg,JPG,JPEG,png,PNG}', { encoding: false })
    .on('data', function(file) {
      console.log('Encontrou arquivo:', file.path);
    })
    .pipe(imagemin([
      mozjpeg({ quality: 75, progressive: true }), // Plugin para JPG
      optipng({ optimizationLevel: 5 }), // Plugin para PNG
      svgo() // Plugin para SVG
    ], { verbose: true }))
    .pipe(gulp.dest('dist/images/'))
    .on('end', function() {
      console.log('Compressão de imagens finalizada!');
    });
});

// Tarefa para comprimir JS
gulp.task('js', function() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

// Tarefa padrão
gulp.task('default', gulp.parallel('sass', 'images', 'js'));

// Tarefa watch (opcional)
gulp.task('watch', function() {
  gulp.watch('src/scss/*.scss', gulp.series('sass'));
  gulp.watch('src/images/*.{jpg,jpeg,JPG,JPEG,png,PNG}', gulp.series('images'));
  gulp.watch('src/js/*.js', gulp.series('js'));
});