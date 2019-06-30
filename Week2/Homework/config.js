'use strict';

const mysql = require('mysql');
const util = require('util');
const prompt = require('prompt');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

module.exports = {
  connection,
  execQuery,
  input,
};
