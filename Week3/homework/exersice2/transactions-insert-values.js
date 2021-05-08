var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'Password',
  database: 'Class31',
});

connection.connect();

connection.query('INSERT INTO account VALUES (101 , 10000)', handleError);
connection.query(
  'INSERT INTO account_changes VALUES (0, 102 , 5, "2021-05-06 11:30:27", "LOAN")',
  handleError,
);
function handleError(err, results) {
  if (err) {
    throw err;
  }
  console.log(results);
}
connection.end();
