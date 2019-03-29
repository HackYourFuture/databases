'use strict';

const mysql = require('mysql');
const config = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'BassamHager',
  database: 'new_world',
});

module.exports = config;
