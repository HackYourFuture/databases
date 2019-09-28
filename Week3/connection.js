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
    console.log('Connected to database successfully');
  } else {
    console.log('Connection to database failed');
  }
});

module.exports = { mysqlConnection, execQuery };
