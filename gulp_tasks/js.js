module.exports = function(gulp, $, browserSync, config) {
    return function() {
        gulp.src(config.from)
            .pipe($.plumber())
            .pipe($.webpack({
                module: {
                    loaders: [{
                        test: /\.jsx?$/,
                        loader: 'babel?presets[]=es2015'
                    }, {
                        test: /\.hbs$/,
                        loader: 'handlebars-loader'
                    }]
                },
                output: {
                    filename: "app.js"
                }
            }))
            .pipe($.uglify())
            .pipe(gulp.dest(config.to))
            .pipe(browserSync.reload({stream: true}));
    }
}
