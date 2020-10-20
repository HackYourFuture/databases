var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'Fatma',
  password : 'hyfpassword',
  database : 'userdb',
  // port : 3307 // Uncomment this line and replace xxxx with the selected port number if you are not using default 3306. I also suggest to download MySQL version 5.7 because recent versions has authentication problems

});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();
