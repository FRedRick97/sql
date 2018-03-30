const express = require('express');
const app = express();

var personRouter = require('./routes/personRouter');
var changeRouter = require('./routes/changeRouter');
var indexRouter = require('./routes/indexRouter');
app.set('view engine', 'pug');

app.use('/assets', express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/person', personRouter);
app.use('/change', changeRouter);

var connection = require('./db/connection');

app.listen(3000, function () {
    console.log('Server started on port 3000');
});
