'use-strict';

const util = require('util');
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo',
});

pool.query = util.promisify(pool.query);

module.exports = { pool };
