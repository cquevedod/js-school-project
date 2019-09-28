const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const rename = require('gulp-rename');

gulp.task('js', async function () {
    return browserify('./src/js/script.js')
        .transform('babelify', {
            presets: ['@babel/preset-env']
        })
        .bundle()
        .pipe(source('app.js')) // Converts To Vinyl Stream
        .pipe(buffer()) // Converts Vinyl Stream To Vinyl Buffer
        .pipe(rename( {suffix: '.min'} ) )
        // Gulp Plugins Here!
        .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('watch', async () => {
    gulp.watch('./src/js/script.js', gulp.series('js'));
});

gulp.task('default', gulp.parallel('js', 'watch'));