var mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo'
});

const execQuery = util.promisify(connection.query.bind(connection));

module.exports = execQuery;
