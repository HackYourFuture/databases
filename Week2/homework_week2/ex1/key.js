const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "papers",
});

connection.connect();

const author = `CREATE TABLE authors (
    author_no INT NOT NULL AUTO_INCREMENT,
    author_name VARCHAR(50),
    university VARCHAR(50),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('m', 'f'),
    PRIMARY KEY(author_no))`;

const mentor = `ALTER TABLE authors ADD mentor INT, ADD FOREIGN KEY(mentor) REFERENCES authors(author_no); `;
//creating Autors table
connection.query(author, function (error, results) {
  if (error) {
    throw error;
  }
  console.log("the reply is ", results[0]);
});
//inserting Mentor column
connection.query(mentor, function (error, results) {
  if (error) {
    throw error;
  }
  console.log("the reply is ", results[0]);
});

connection.end();
