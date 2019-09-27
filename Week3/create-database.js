const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  multipleStatements: true,
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
  connection.query('CREATE DATABASE IF NOT EXISTS todo', function(err, result) {
    if (err) throw err;
    console.log('Database created');
  });
  connection.end();
});
