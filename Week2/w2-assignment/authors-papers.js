const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  multipleStatements: true,
  database: authors,
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");

  const query = `
  CREATE TABLE author_papers (
  author_id INT,
  paper_id INT,
  PRIMARY KEY (author_id, paper_id),
  FOREIGN KEY (author_id) REFERENCES authors(author_id),
  FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
);


SELECT a.author_name, m.author_name AS mentor_name
FROM authors a
LEFT JOIN authors m ON a.mentor = m.author_id;


SELECT 
  a.*, 
  COALESCE(rp.paper_title, 'No paper published') AS published_paper
FROM authors a
LEFT JOIN 
  author_papers ap ON a.author_id = ap.author_id
LEFT JOIN 
  research_papers rp ON ap.paper_id = rp.paper_id;



  `;

  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    console.log("SQL statements executed successfully", results);
    connection.end();
  });
});
