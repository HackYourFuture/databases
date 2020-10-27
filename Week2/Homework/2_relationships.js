/*
Exercise 2: Relationships

Create another table, called Research_Papers

(insert rows) of 15 authors and 30 research papers
*/

const mysql = require('mysql');
const authorsArray = require('./2_authors');
const papersArray = require('./2_papers');
const authorsPapers = require('./2_authorsPapers');

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
    console.log('MySQL connected...'); 
});

//create table research_rapers
db.query('CREATE TABLE IF NOT EXISTS research_papers(paper_id INT PRIMARY KEY, paper_title VARCHAR(200), conference VARCHAR(100), publish_date DATE)', (err, result) => {
    if(err) throw err;
    console.log('table research_papers created');
});

//AUTHORS DATA
//Make SQL statement:
const sql = "INSERT IGNORE INTO authors(author_no, author_name, university, date_of_birth, h_index, gender, collaborator) VALUES ?";

const query = db.query(sql, [authorsArray], function(err, result) {
    if (err) throw err;
    console.log(result);
}); 

//RESEARCH DATA
const research_sql = "INSERT IGNORE INTO research_papers(paper_id, paper_title, conference, publish_date) VALUES ?";

const research_query = db.query(research_sql, [papersArray], function(err, result) {
    if (err) throw err;
    console.log(result);
}); 

//create ADDITIONAL TABLE: authors_papers
db.query('CREATE TABLE IF NOT EXISTS authors_papers(author_no INT, paper_id INT, PRIMARY KEY(author_no, paper_id), CONSTRAINT FK_AUTH FOREIGN KEY (author_no) REFERENCES authors(author_no), CONSTRAINT FK_PAPER FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id))', (err, result) => {
    if(err) throw err;
    console.log('table authors_papers created');
});

const authorsPapers_sql = "INSERT IGNORE INTO authors_papers() VALUES ?";

const authorsPapers_query = db.query(authorsPapers_sql, [authorsPapers], function(err, result) {
    if (err) throw err;
    console.log(result);
});


db.end();

//I had to use the below code for ERROR 1452: Cannot add or update a child row: a foreign key constraint fails
//SET GLOBAL FOREIGN_KEY_CHECKS=0;
//source: stack overflow


