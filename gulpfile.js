var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Compile sass into CSS & auto-inject into browser
gulp.task('sass',function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','public/assets/scss/main.scss'])
        .pipe(sass())
        .pipe(autoprefixer( { browsers: ['last 2 versions']} ))
        .pipe(gulp.dest('public/assets/css'))
        .pipe(browserSync.stream());
});

// Move the Javascript files to public/assets/js
gulp.task('js',function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest('public/assets/js'))
        .pipe(browserSync.stream());
});

// Static Servers + watching html/scss files
gulp.task('serve',function () {
    browserSync.init({
        server: "./public"
    });
    // gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','public/assets/scss/main.scss'],['sass']);
    gulp.watch('public/*.html').on('change',browserSync.reload);
});

gulp.task('default',['serve']);