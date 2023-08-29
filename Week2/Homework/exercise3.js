const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "password",
    database: "HYF",
  });

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected to DataBase`);
});

connection.query(
  `
SELECT  A.author_name, M.author_name AS mentor
FROM authors A
LEFT JOIN authors M ON A.mentor = M.author_id;
`,
  (err, result) => {
    if (err) throw err;
    console.log(result.map((res) => ({ ...res })));
  },
);

connection.query(
  `
  SELECT authors.author_name, research_Papers.paper_title
  FROM authors
  LEFT JOIN papers_by_authors ON authors.author_id = papers_by_authors.author_id
  LEFT JOIN research_Papers ON papers_by_authors.paper_id = research_Papers.paper_id;

`,
  (err, result) => {
    if (err) throw err;
    console.log(result.map((res) => ({ ...res })));
  },
);

connection.end();