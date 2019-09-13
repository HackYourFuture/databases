const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

connection.connect();
const insert_queries = [
  "insert into student values ('Mehmet', 40, 'm', 'Turkey', '1979-03-10', 1.78)",
  "insert into student values ('Atya', 32, 'f', 'Turkey', '1986-10-20', 1.73)",
];

for (let i in insert_queries) {
  console.log('Going to run ', insert_queries[i]);
  connection.query(insert_queries[i], (error, results, fields) => {
    if (error) {
      throw error;
    }
    console.log('the reply is ', results[0]);
  });
}
connection.end();
