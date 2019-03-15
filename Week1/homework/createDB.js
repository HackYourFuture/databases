var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
});

connection.connect();

connection.query('CREATE DATABASE world', function (error, results, fields) {
  if (error) throw error;
  console.log('Database created successfully');
});

connection.end();
