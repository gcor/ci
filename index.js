var express = require('express');
var random = require('./app/random');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', function(request, response) {
    console.time('render');
    response.render('pages/index', {
        number: random.getRandomWeather()
    });
    console.timeEnd('render');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
