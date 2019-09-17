'use-strict';

const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

connection.query = util.promisify(connection.query);
connection.end = util.promisify(connection.end);

module.exports = connection;
