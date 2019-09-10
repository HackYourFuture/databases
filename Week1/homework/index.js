'use strict';

const mysql = require('mysql');
const dbTb = require('./queries_db_tb');
const dataBase = [dbTb.dropDbWorld, dbTb.creatDbWorld];
const tables = [
    dbTb.dropTableCountry,
    dbTb.CreateTableCountry,
    dbTb.dropTableCity,
    dbTb.CreateTableCity,
];
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
});

connection.connect(function(err) {
    if (err) console.log(err);
    else console.log('Connected!');
});

dataBase.forEach(element => {
    connection.query(element, function(err, result) {
        if (err) console.log(err);
    });
});

connection.changeUser({ database: 'world' }, function(err) {
    if (err) console.log(err);
    else console.log('used databse is now: world');
});

tables.forEach(element => {
    connection.query(element, function(err, result) {
        if (err) console.log(err);
    });
});

connection.end();

module.exports = connection;