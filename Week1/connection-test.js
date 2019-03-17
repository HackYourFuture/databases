var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyf_Pass1',
  database: 'userdb',
  socketPath: '/var/run/mysqld/mysqld.sock',
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();
