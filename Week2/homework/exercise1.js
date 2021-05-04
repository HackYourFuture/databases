const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'Password',
  database: 'class31',
  // port : 3307
});

connection.connect();

connection.query('DROP TABLE IF EXISTS authors;', handleError);

connection.query(
  'create table authors (author_no int Primary Key, author_name varchar(30), university varchar(50), date_of_birth datetime, h_index int, gender ENUM ("MALE", "FEMALE"));',
  handleError,
);
connection.query(
  'ALTER TABLE class31.authors ADD COLUMN mentor int, ADD FOREIGN KEY (mentor) REFERENCES authors(author_no);',
  handleError,
);

function handleError(err, results) {
  if (err) {
    throw err;
  }
}

connection.end();
