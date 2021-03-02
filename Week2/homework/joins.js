const mysql = require("mysql");

/*Write a query that prints names of all authors and their corresponding mentors.*/

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "tarek123321",
});

db.query('USE week2')


const getInfoFromDatabase = (query) => {
    db.query(query, (error, results) => {
      if (error) {
        throw error;
      }
      console.log('Results', results);
    });
  };
  
  getInfoFromDatabase(
    'SELECT a.author_name AS author, b.author_name as mentor FROM authors a JOIN authors b ON b.author_no = a.mentor;',
  );

/*Write a query that prints all columns of authors and their published paper_title. If there is an author without any research_Papers, print the information of that author too.*/

getInfoFromDatabase(
    `SELECT authors.*, research_papers.paper_title FROM authors LEFT JOIN papers_details ON authors.author_no = papers_details.author_no LEFT JOIN research_papers ON papers_details.paper_id = research_papers.paper_id GROUP BY authors.author_no, research_papers.paper_id;`,
  );

  db.end();
