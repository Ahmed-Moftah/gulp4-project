const gulp = require("gulp");
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();



//copy HTML

gulp.task('copyHTML', function(done){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
        done();
})

//image minification
gulp.task('imagemin', function(done){
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images')); 
        done();
    });


//sass compile
gulp.task('sass', function(done){
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
        done();
    });


// start bootstrap bundle
//bootstrap bundle from node_modules
gulp.task('bootstrap', function(done){
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('dist/css'))
        done();
});
// bootstrap and jQuery scripts concat
gulp.task('bootstrap_scripts', function(done){
       gulp.src(['node_modules/bootstrap/dist/js/bootstrap.bundle.js', 'node_modules/jquery/dist/jQuery.min.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        done();
    });
// end bootstrap bundle


// scripts concat
gulp.task('scripts', function(done){
    gulp.src('src/js/*.js')
    //    gulp.src(['node_modules/bootstrap/dist/js/bootstrap.bundle.js', 'node_modules/jquery/dist/jQuery.min.js', 'src/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
        done();
    });







//run all in one command....

gulp.task('default', gulp.series('sass', 'imagemin', 'copyHTML','scripts','bootstrap','bootstrap_scripts'));

gulp.task('watch', function(done){
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/images/*', gulp.series('imagemin'));
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('copyHTML'));
    done();
  });

  







// run project:
// npm install
// gulp
// gulp watch