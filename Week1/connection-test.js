var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser2',
  password: 'hyfpassword',
  database: 'zoo',
  insecureAuth: true,
});

connection.connect();

connection.query('SELECT * from animal', function(error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();
