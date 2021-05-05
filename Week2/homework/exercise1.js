const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'Password',
});

connection.connect();

connection.query('CREATE DATABASE class31');

connection.query('USE class31');

connection.query('DROP TABLE IF EXISTS authors;', handleError);

connection.query(
  'create table authors (author_no int Primary Key, author_name varchar(30), university varchar(50), date_of_birth datetime, h_index int, gender ENUM ("MALE", "FEMALE"));',
  handleError,
);
connection.query('ALTER TABLE authors ADD COLUMN mentor int', handleError);
connection.query(
  'ALTER TABLE authors ADD  CONSTRAINT fk_auth FOREIGN KEY (mentor) REFERENCES authors(author_no);',
  handleError,
);

function handleError(err, results) {
  if (err) {
    throw err;
  }
  console.log(results);
}

connection.end();
