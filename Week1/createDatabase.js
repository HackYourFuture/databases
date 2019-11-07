const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  insecureAuth: true,
});

connection.connect();

connection.query('CREATE DATABASE myWorld', function(error, results, fields) {
  if (error) throw error;
  console.log('This is myWorld database');
});

connection.query('USE myWorld;', error => {
  if (error) throw error;
  console.log(`you accessed the database 'myWorld'`);
});

connection.end();
