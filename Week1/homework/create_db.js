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
const countries = dbTb.insertContires;
const cities = dbTb.insertCities;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
});

connection.connect(function(err) {
    if (err) console.log(err);
    else
        console.log(
            'Connected: 2 tables and 4318 records will be added to the database.\n That takes time!  about 7 minutes and maybe more.',
        );
});

dataBase.forEach(element => {
    connection.query(element, function(err, result) {
        if (err) console.log(err);
    });
});

connection.changeUser({ database: 'world' }, function(err) {
    if (err) console.log(err);
});

tables.forEach(element => {
    connection.query(element, function(err, result) {
        if (err) console.log(err);
    });
});

countries.forEach(element => {
    connection.query(element, function(err, result) {
        if (err) console.log(err);
    });
});

cities.forEach(element => {
    connection.query(element, function(err, result) {
        if (err) console.log(err);
    });
});

connection.end(function(err) {
    if (err) {
        return console.log('error:' + err.message);
    }
    console.log('All the data and records are added. The connection is closed.');
});