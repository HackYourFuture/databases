const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  multipleStatements: true,
  database : authors,
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");

  const query = `
  CREATE TABLE research_papers (
  paper_id INT PRIMARY KEY,
  paper_title VARCHAR(255),
  conference VARCHAR(255),
  publish_date DATE
);

CREATE TABLE author_papers (
  author_id INT,
  paper_id INT,
  PRIMARY KEY (author_id, paper_id),
  FOREIGN KEY (author_id) REFERENCES authors(author_id),
  FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)
);



  `;

  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    console.log("SQL statements executed successfully", results);
    connection.end();
  });
});
