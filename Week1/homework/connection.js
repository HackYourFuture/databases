'use strict';

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'BassamHager',
  database: 'world',
});

module.exports = connection;
