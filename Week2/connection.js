const mysql = require('mysql');
const util = require('util');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
  multipleStatements: true,
});
const execQuery = util.promisify(connection.query.bind(connection));
connection.connect();

module.exports = { connection, execQuery };
