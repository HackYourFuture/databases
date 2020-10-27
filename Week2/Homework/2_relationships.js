/*
Exercise 2: Relationships

Create another table, called Research_Papers

(insert rows) of 15 authors and 30 research papers
*/

const mysql = require('mysql');
const authorsArray = require('./2_authors');
const papersArray = require('./2_papers');

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

db.end();

//I had to use the below code for ERROR 1452: Cannot add or update a child row: a foreign key constraint fails
//SET GLOBAL FOREIGN_KEY_CHECKS=0;
//source: stack overflow


