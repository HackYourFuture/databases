const util = require('util');
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo',
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }

  if (connection) connection.release();

  return;
});

// Promisify for Node.js async/await.
const execQuery = util.promisify(pool.query.bind(pool));

module.exports = { execQuery };
