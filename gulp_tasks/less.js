module.exports = function(gulp, $, browserSync, config) {
    return function() {
        gulp.src(config.from)
            .pipe($.plumber())
                .pipe($.less())
                .on('error', console.log)
                .pipe($.autoprefixer())
                .pipe($.csso())
            .pipe(gulp.dest(config.to))
            .pipe(browserSync.reload({stream: true}));
    };
}
