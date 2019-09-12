const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

connection.query = util.promisify(connection.query);
pool.query = util.promisify(pool.query);

module.exports = { connection, pool };
