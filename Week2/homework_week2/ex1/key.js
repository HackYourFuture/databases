import { createConnection } from "mysql";

const connection = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "papers",
});

async function createAuthors() {
  const author = `CREATE TABLE authors (
    author_no INT NOT NULL AUTO_INCREMENT,
    author_name VARCHAR(50),
    university VARCHAR(50),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('m', 'f'),
    PRIMARY KEY(author_no))`;

  const mentor = `ALTER TABLE authors ADD mentor INT, ADD FOREIGN KEY(mentor) REFERENCES authors(author_no); `;
  connection.connect();
  try {
    await Promise.all[
      (connection.query(author, (error, results) => {
        error ? error : console.log("the reply is ", results[0]); //creating Authors table
      }),
      connection.query(mentor, (error, results) => {
        error ? error : console.log("the reply is ", results[0]); //inserting Mentor column
      }))
    ];
  } catch (error) {
    console.error(error);
  }
  connection.end();
}
createAuthors();
