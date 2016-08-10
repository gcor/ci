module.exports = function(gulp, $, browserSync, config) {
    return function() {

        gulp.src(config.fromJS)
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
            .pipe(gulp.dest(config.toJS))

        gulp.src(config.fromCSS)
            .pipe($.less())
            .pipe($.autoprefixer())
            .pipe($.csso())
            .pipe(gulp.dest(config.toCSS))


        gulp.src(config.fromMedia).pipe(gulp.dest(config.toMedia))

        gulp.src(config.fromImg)
            .pipe($.imagemin({
                progressive: true,
                svgoPlugins: [{
                    removeViewBox: false
                }],
                interlaced: true
            }))
            .pipe(gulp.dest(config.toImg))

    }
}
