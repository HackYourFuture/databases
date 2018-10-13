"use strict";

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'shadi',
    password: '',
    database: 'todo',
    port: 3307
});
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
