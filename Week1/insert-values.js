var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

connection.connect();
var insert_queries = [
  "insert into student values ('Mehmet', 40, 'm','Turkey', '1986-01-11', 1.78)",
  "insert into student values ('Arya', 32, 'f', 'Turkey', '1979-11-01', 1.73)",
];

for (var i in insert_queries) {
  console.log('Going to run ', insert_queries[i]);
  connection.query(insert_queries[i], function(error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('the reply is ', results[0]);
  });
}
connection.end();
