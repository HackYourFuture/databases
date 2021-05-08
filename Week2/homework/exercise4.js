var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'Password',
  database: 'Class31',
  // port : 3307
});

connection.connect();

connection.query(
  `SELECT count(author_name),paper_title
  FROM research_papers
  JOIN authors
  ON authors.author_no = research_Papers.paper_id
  GROUP BY paper_title`,
  ifErrorAndConsole,
);

connection.query(
  `SELECT paper_title, gender
  FROM research_papers
  JOIN authors
  ON authors.author_no = research_Papers.paper_id
  WHERE gender = "female"`,
  ifErrorAndConsole,
);

connection.query(
  `SELECT university, AVG(h_index)
  FROM research_papers
  JOIN authors
  ON authors.author_no = research_Papers.paper_id
  GROUP BY  university`,
  ifErrorAndConsole,
);

connection.query(
  `SELECT university, count(paper_title)
  FROM research_papers
  JOIN authors
  ON authors.author_no = research_Papers.paper_id
  GROUP BY  university`,
  ifErrorAndConsole,
);

connection.query(
  `SELECT university, MAX(h_index), MIN(h_index)
  FROM research_papers
  JOIN AUTHORS
  ON authors.author_no = research_Papers.paper_id
  GROUP BY  university`,
  ifErrorAndConsole,
);

function ifErrorAndConsole(error, results) {
  if (error) {
    throw error;
  }
  console.log(results.filter((result) => console.log(result)));
}
connection.end();
