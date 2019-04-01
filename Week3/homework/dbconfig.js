'use strict';

const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyf_Pass1',
  database: 'todo',
});

const execQuery = util.promisify(connection.query.bind(connection));

module.exports = { execQuery };
