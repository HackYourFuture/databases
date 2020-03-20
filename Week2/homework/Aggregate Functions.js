//mysql config
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'ammar_week2_database'
});

const queries = [
//sum of the research papers published by all female authors 
`SELECT count(paper_title)
FROM research_papers
JOIN authors 
ON research_papers.author_no = authors.author_no 
WHERE gender = 'f' `,
`SELECT university, AVG(h_index)
 FROM authors 
 GROUP BY university;`,
 //Average of the h-index fo all authors per university 
 `SELECT university, count(paper_title) 
 FROM research_papers 
 JOIN authors on research_papers.author_no = authors.author_no 
 GROUP BY university;`,
 //Sum of the research papers of the authors per university 
`select COUNT(paper_title), university 
FROM research_papers 
JOIN authors 
ON research_papers.author_no = authors.author_no 
Group by university;`
//Minimum and maximum of the h-index of all authors per university.

 ]

 for(var i in queries){
    console.log("Going to run ", queries[i]) 
    connection.query(queries[i], function (error, results, fields) {
        if (error) {
            throw error;
        }
        console.log("the reply is ", results);
    });
}


connection.end();

