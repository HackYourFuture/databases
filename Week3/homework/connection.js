'use-strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todoapp',
});

module.exports = connection;
