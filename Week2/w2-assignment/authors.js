const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  multipleStatements: true,
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");

  const query = `
  DROP DATABASE IF EXISTS authors;
  CREATE DATABASE authors;
  USE authors;

  CREATE TABLE authors (
  author_id INT AUTO_INCREMENT PRIMARY KEY,
  author_name VARCHAR(100),
  university VARCHAR(100),
  date_of_birth DATE,
  h_index INT,
  gender VARCHAR(10)
);


ALTER TABLE authors
ADD COLUMN mentor INT,
ADD CONSTRAINT fk_mentor
  FOREIGN KEY (mentor) REFERENCES authors(author_id);


  `;

  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    console.log("SQL statements executed successfully", results);
    connection.end();
  });
});