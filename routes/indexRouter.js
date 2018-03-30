const express = require('express');
const mysql = require('mysql');

app.get('/', function (req, res) {
    res.render('welcome');
});
