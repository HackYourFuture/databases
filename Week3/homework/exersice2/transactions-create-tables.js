var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'Password',
  database: 'Class31',
  // port : 3307
});

connection.connect();

connection.query('DROP TABLE IF EXISTS account;', handleError);
connection.query('DROP TABLE IF EXISTS account_changes;', handleError);

connection.query(
  'CREATE TABLE account (account_number INT PRIMARY KEY, balance INT)',
  handleError,
);
connection.query(
  'CREATE TABLE account_changes (change_number INT, account_number INT PRIMARY KEY, amount INT, changed_date DATE, remark VARCHAR(250))',
  handleError,
);
function handleError(err, results) {
  if (err) {
    throw err;
  }
  console.log(results);
}
connection.end();
