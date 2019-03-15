var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'world',
});

connection.connect();

connection.query('SELECT 1 + 1', function (error, results, fields) {
  if (error) throw error;
  console.log('Connected successfully');
});

connection.end();
