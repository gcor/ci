module.exports = function(gulp, $, browserSync, config) {
    return function() {
        gulp.src(config.from)
            .pipe(gulp.dest(config.to))
            .pipe(browserSync.reload({stream: true}));
    }
}
