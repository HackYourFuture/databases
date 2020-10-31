/*
Exercise 3: Joins

Write a query that prints names of all Authors and their corresponding Collaborators.

Write a query that prints all columns of Authors and their published paper_title. If there is an author without any Research_Papers, print the information of that Author too.
*/

const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'Password123^&(',
    database : 'authors_papers'
});

//connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL connected joins!...'); 
});

//query authors and their collaborators
const sql = `
SELECT a.author_name auth_name, c.author_name coll_name 
FROM authors a, authors c 
WHERE a.collaborator = c.author_no`;

const query = db.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result);
}); 

//Authors and their published paper_title
//use LEFT JOIN in case of asymmetric data (ie. authors with no research_paper)
const sql_authorsAndPapers = `
SELECT author_name, university, date_of_birth, h_index, gender, collaborator, paper_title 
FROM authors
LEFT JOIN authors_papers
ON authors.author_no = authors_papers.author_no
LEFT JOIN research_papers
ON authors_papers.paper_id = research_papers.paper_id`;

const query_authorsAndPapers = db.query(sql_authorsAndPapers, function(err, result) {
    if (err) throw err;
    console.log(result);
}); 

db.end();
