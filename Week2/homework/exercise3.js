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
  'SELECT A1.author_name AS Author, A2.author_name AS Mentor FROM authors AS a1 INNER JOIN `authors` AS a2 ON a1.`author_no` = a2.`mentor`',
  ifErrorAndConsole,
);

connection.query(
  'SELECT author_no,author_name,university,date_of_birth,h_index,gender,`paper_title` FROM authors LEFT JOIN research_Papers ON authors.author_no = research_Papers.paper_id',
  ifErrorAndConsole,
);
function ifErrorAndConsole(error, results) {
  if (error) {
    throw error;
  }
  console.log(results.filter((result) => console.log(result)));
}
connection.end();
