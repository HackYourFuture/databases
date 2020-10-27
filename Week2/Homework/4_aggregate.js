/*
Exercise 4: Aggregate Functions

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
    console.log('MySQL connected Aggregate Functions!...'); 
});

//1. All research papers and the number of authors that wrote that paper.
const sql = "SELECT rp.paper_title, COUNT(author_name) FROM research_papers rp INNER JOIN authors_papers ap ON ap.paper_id = rp.paper_id INNER JOIN authors au ON au.author_no = ap.author_no GROUP BY paper_title";

const query = db.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result);
}); 

//2. Sum of the research papers published by all female authors.
const sql_paperByGender = 'SELECT gender, count(paper_title) FROM authors au INNER JOIN authors_papers ap ON au.author_no = ap.author_no INNER JOIN research_papers rp ON rp.paper_id = ap.paper_id WHERE gender = "f"';

const query_paperByGender = db.query(sql_paperByGender, function(err, result) {
    if (err) throw err;
    console.log(result);
}); 

//3. Average of the h-index of all authors per university.
const sql_AVG = 'SELECT university, AVG(h_index) FROM authors GROUP BY university';

const query_AVG = db.query(sql_AVG, function(err, result) {
    if (err) throw err;
    console.log(result);
});

//4. Sum of the research papers of the authors per university.
const sql_groupByUni = 'SELECT university, count(paper_title) FROM authors au INNER JOIN authors_papers ap ON au.author_no = ap.author_no INNER JOIN research_papers rp ON rp.paper_id = ap.paper_id GROUP BY university';

const query_groupByUni = db.query(sql_groupByUni, function(err, result) {
    if (err) throw err;
    console.log(result);
});

//5. Minimum and maximum of the h-index of all authors per university.
const sql_MinMax = 'SELECT university, MIN(h_index), MAX(h_index) FROM authors GROUP BY university';

const query_MinMax = db.query(sql_MinMax, function(err, result) {
    if (err) throw err;
    console.log(result);
});

db.end();