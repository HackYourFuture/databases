const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

connection.connect();

const create_query =
  "create table teachers (teacher_number int, teacher_name varchar(50), date_of_birth date, subject text, gender enum('m', 'f'))";

connection.query(create_query, (error, results, fields) => {
  if (error) {
    throw error;
  }
  console.log('the reply is ', results[0]);
});
connection.end();
