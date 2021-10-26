const util = require('util');
const mysql = require('mysql');
const connection = require('./dbConfig.js');

const execQuery = util.promisify(connection.query.bind(connection));

async function execSomeQueries(){
  const queries = [
    `
      SELECT outer_author.author_name, (
        SELECT inner_author.author_name 
        FROM authors inner_author 
        WHERE inner_author.author_no = outer_author.mentor
        ) AS mentor
      FROM authors outer_author;
    `,
    `
      WITH previous_query AS (
        SELECT paper_title, author_no
          FROM research_papers, paper_author
          WHERE research_papers.paper_id = paper_author.paper_id
      )
      SELECT authors.author_no, author_name, university, date_of_birth, h_index, gender, mentor, paper_title
      FROM authors
        LEFT JOIN previous_query
          ON authors.author_no = previous_query.author_no;   
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