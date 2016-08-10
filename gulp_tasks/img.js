module.exports = function(gulp, $, browserSync, config) {
    return function() {
        gulp.src(config.from)
            .pipe($.imagemin({
                progressive: true,
                svgoPlugins: [{
                    removeViewBox: false
                }],
                interlaced: true
            }))
            .pipe(gulp.dest(config.to))
            .pipe(browserSync.reload({stream: true}));
    }
}
