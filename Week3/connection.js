const mysql = require('mysql');
const util = require('util');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todoapp',
  multipleStatements: true,
});

const execQuery = util.promisify(mysqlConnection.query.bind(mysqlConnection));

mysqlConnection.connect(err => {
  if (!err) {
    console.log('connected');
  } else {
    console.log('failed');
  }
});

module.exports = { mysqlConnection, execQuery };
