const mysql = require('mysql');
const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.use('/assets', express.static(__dirname + '/public'));

function getMySQLConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'company'
    });
}

app.get('/', function (req, res) {
    res.render('welcome');
});

app.get('/person', function (req, res) {
    var personList = [];
    // starting connection
    var connection = getMySQLConnection();
    connection.connect(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('query successfull');
        }
    });

    connection.query('SELECT * FROM person', function (err, rows, fields) {
        if (err) {
            res.status(500).json({ "status_code": 500, "status_message": err });
        }
        else {
            for (var i = 0; i < rows.length; i++) {
                // Create an object to save current row's data
                var person = {
                    'id': rows[i].id,
                    'name': rows[i].name,
                    'address': rows[i].address
                }
                // Add object into array
                personList.push(person);
            }
            // Render index.pug page using array
            res.render('index', { "personList": personList });
        }
    });
    connection.end();
});

app.listen(3000, function () {
    console.log('Server started on port 3000');
});
