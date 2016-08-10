var path = require("path");
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const buildPath = './public/'; 
const srcPath = './src/'; 

function getTask(task, config) {
    return require('./gulp_tasks/' + task)(gulp, plugins, browserSync, config);
}

const config = {
    server: {
        files: ["views/**/*", "index.js"],
        expressPort: 5000,
        port: 7000,
        main: "index.js"
    },
    client: {
        port: 8080,
        files: "src/**/*",
        syncServer: buildPath
    },
    from: {
        less_common: srcPath +"styles/style.less",
        less: srcPath +"styles/**/*.less",
        js: [srcPath +"js/**/*.js", srcPath +"templates/**/*"],
        img: srcPath +"img/**/*",
        media: srcPath +"media/**/*",
    },
    to: {
        css: buildPath + "css/",
        js: buildPath + "js/",
        img: buildPath + "img/",
        media: buildPath + "media/**/*"
    }
};

gulp
    .task('js', getTask('js', {
        from: config.from.js,
        to: config.to.js
    }))
    .task('less', getTask('less', {
        from: config.from.less_common,
        to: config.to.css
    }))
    .task('images', getTask('img', {
        from: config.from.img,
        to: config.to.img
    }))
    .task('media', getTask('copy', {
        from: config.from.media,
        to: config.to.media
    }))
    .task('client-sync', getTask('sync', {
        open: false,
        server: config.client.syncServer,
        files: config.client.files,
        port: config.client.port
    }));

gulp
    .task('build', getTask('build', {
        fromJS: config.from.js,
        toJS: config.to.js,
        fromCSS: config.from.less_common,
        toCSS: config.to.css,
        fromImg: config.from.img,
        toImg: config.to.img,
        fromMedia: config.from.media,
        toMedia: config.to.media
    }))
    .task('w', ['less', 'js', 'images', 'client-sync'], () => {
        gulp.watch(config.from.pug, ['pug']);
        gulp.watch(config.from.less, ['less']);
        gulp.watch(config.from.js, ['js']);
        gulp.watch(config.from.img, ['images']);
    });
