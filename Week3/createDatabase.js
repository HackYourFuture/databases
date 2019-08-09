'use strict';

const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const execQuery = util.promisify(connection.query.bind(connection));

//create database and use it
const databaseQuery = ['drop database if exists todoapp', 'create database todoapp', 'use todoapp'];

async function createDatabase() {
  for (let i = 0; i < databaseQuery.length; i++) {
    await execQuery(databaseQuery[i]);
  }
}
createDatabase();
connection.connect();

connection.end();
module.exports = { execQuery };
