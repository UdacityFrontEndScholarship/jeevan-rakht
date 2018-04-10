var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Compile sass into CSS & auto-inject into browser
gulp.task('sass',function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','assets/scss/style.scss'])
        .pipe(sass())
        .pipe(autoprefixer( { browsers: ['last 2 versions']} ))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream());
});

// Move the Javascript files to src/js
gulp.task('js',function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest('assets/js'))
        .pipe(browserSync.stream());
});

// Static Servers + watching html/scss files
gulp.task('serve',['sass'],function () {
    browserSync.init({
        server: "."
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','assets/scss/style.scss'],['sass']);
    gulp.watch('*.html').on('change',browserSync.reload);
});

gulp.task('default',['js','serve']);