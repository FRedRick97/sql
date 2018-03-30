const express = require('express');
const mysql = require('mysql');

var connection = require('./../db/connection');

var router = express.Router();

router.get('/', function (req, res) {
    var personList = [];
    // starting connection
    connection.connect(function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('connected');
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
});

module.exports = router;

