const util = require('util');
const mysql = require('mysql');
const connection = require('./dbConfig.js');

const execQuery = util.promisify(connection.query.bind(connection));

async function execSomeQueries(){
  const queries = [
    `
    SELECT paper_title, COUNT(author_no) AS number_of_authors
    FROM paper_author, research_papers
    WHERE paper_author.paper_id = research_papers.paper_id
    GROUP BY paper_title;
    `,
    `
    SELECT COUNT(DISTINCT paper_id) AS Total_Papers_Published_By_Female
    FROM authors, paper_author
    WHERE authors.author_no = paper_author.author_no AND gender = 'F';
    `,
    `
    SELECT university, AVG(h_index)
    FROM authors
    GROUP BY university;
    `,
    `
    SELECT university, COUNT(paper_id) AS Number_of_Papers
    FROM authors, paper_author
    WHERE authors.author_no = paper_author.author_no
    GROUP BY university;
    `,
    `
    SELECT university, MIN(h_index), MAX(h_index)
    FROM authors
    GROUP BY university;
    `
  ]

  connection.connect();

  try {
    queries.forEach(async query => {
      console.log(await execQuery(query));
    });
  } catch (error) {
    console.error(error);
    connection.end();
  }
  
  connection.end();

}

execSomeQueries();