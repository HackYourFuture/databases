'use strict';
const mysql = require('mysql');
const util = require('util')

// we connect to mysql via the create connection.
// Exercise: find a library that allows you to have those values in a config file
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'YOUR USER WITH PRIVILEGES TO INSERT UPDATE',
    password: 'YOUR PASSWORD HERE',
    port: '3306',
    database: 'world'
});

// a query to expose the connection in a promisified way
const query = util.promisify(connection.query.bind(connection));

// Mark the begin of a transaction
async function beginTransaction() {
  connection.beginTransaction();
}

// commit a transaction
async function commit() {
  connection.commit();
}

// rollback a transaction
async function rollback() {
  connection.rollback();
}

module.exports = {
  query, beginTransaction, commit, rollback
};
