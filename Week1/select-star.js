const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

connection.connect();

const select_query = 'select * from student';

console.log('Going to run ', select_query);
connection.query(select_query, (error, results, fields) => {
  if (error) {
    throw error;
  }
  for (i in results) {
    console.log(results[i]);
  }
});
connection.end();
