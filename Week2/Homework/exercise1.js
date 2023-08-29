const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "password",
  database: "HYF",

});


connection.query(
  `
    CREATE TABLE authors (
        author_id INT PRIMARY KEY,
        author_name VARCHAR(100),
        university VARCHAR(100),
        date_of_birth DATE,
        h_index INT,
        gender VARCHAR(10)
    )`,
  (err, results) => {
    if (err) {
      console.error("Error creating authors table:", err);
      connection.end();
      return;
    }

    connection.query(
      `
        ALTER TABLE authors
        ADD COLUMN mentor INT,
        ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id)`,
      (err, results) => {
        if (err) {
          console.error("Error adding mentor column:", err);
        } else {
          console.log("Mentor column was  added .");
        }

        connection.end();
      }
    );
  }
);