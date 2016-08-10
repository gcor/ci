const gulp = require('gulp'),
    less = require('gulp-less'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    webpack = require('gulp-webpack'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    prefixer = require('gulp-autoprefixer'),
    bsync = require('browser-sync');

const browserSync = bsync.create(),
    reload = browserSync.reload,
    buildPath = './public/',
    srcPath = './src/',
    config = {
        client: {
            port: 8080,
            files: 'src/**/*',
            syncServer: buildPath
        },
        from: {
            lessCommon: srcPath + 'styles/style.less',
            less: srcPath + 'styles/**/*.less',
            js: [srcPath + 'js/**/*.js', srcPath + 'templates/**/*'],
            img: srcPath + 'img/**/*',
            media: srcPath + 'media/**/*'
        },
        to: {
            css: buildPath + 'css/',
            js: buildPath + 'js/',
            img: buildPath + 'img/',
            media: buildPath + 'media/**/*'
        }
    };


gulp
    .task('client-sync', function() {
        browserSync.init(null, {
            notify: false,
            server: config.client.server,
            files: config.client.files,
            port: config.client.port
        });
    })


.task('less', function() {
        gulp.src(config.from.lessCommon)
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(less())
            .on('error', console.log)
            .pipe(prefixer())
            .pipe(csso())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.to.css))
            .pipe(browserSync.reload({
                stream: true
            }));
    })
    .task('js', function() {
        gulp.src(config.from.js)
            .pipe(webpack({
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
                    filename: 'app.js'
                }
            }))
            .pipe(uglify())
            .pipe(gulp.dest(config.to.js))
            .pipe(reload({
                stream: true
            }));
    })
    .task('media', function() {
        gulp.src(config.from.media)
            .pipe(gulp.dest(config.to.media))
            .pipe(reload({
                stream: true
            }));
    })
    .task('images', function() {
        gulp.src(config.from.img)
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{
                    removeViewBox: false
                }],
                interlaced: true
            }))
            .pipe(gulp.dest(config.to.img))
            .pipe(reload({
                stream: true
            }));
    });

gulp
    .task('build', function() {
        gulp.src(config.from.lessCommon)
            .pipe(less())
            .pipe(prefixer())
            .pipe(csso())
            .pipe(gulp.dest(config.to.css));

        gulp.src(config.from.js)
            .pipe(webpack({
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
                    filename: 'app.js'
                }
            }))
            .pipe(uglify())
            .pipe(gulp.dest(config.to.js));

        gulp.src(config.from.media)
            .pipe(gulp.dest(config.to.media));

        gulp.src(config.from.img)
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{
                    removeViewBox: false
                }],
                interlaced: true
            }))
            .pipe(gulp.dest(config.to.img));
    })
    .task('w', ['less', 'js', 'images', 'client-sync'], () => {
        gulp.watch(config.from.less, ['less']);
        gulp.watch(config.from.js, ['js']);
        gulp.watch(config.from.img, ['images']);
    });
