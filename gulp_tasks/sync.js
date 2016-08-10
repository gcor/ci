module.exports = function(gulp, $, browserSync, config) {
    return function() {
        var conf = { notify: false }
        for (var prop in config) {
            if (!{}.hasOwnProperty.call(conf, prop)) {
                conf[prop] = config[prop];
            }
        }
        browserSync.init(null, conf);
    }
}
