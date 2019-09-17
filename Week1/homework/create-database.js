var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
  con.query('CREATE DATABASE myWorld', function(err, result) {
    if (err) throw err;
    console.log('Database created');
  });
});
