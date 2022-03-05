const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('compress', () => {
    return gulp.src('./src/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
})
