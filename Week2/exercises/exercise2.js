const util = require('util');
const mysql = require('mysql');
const authors = require("./authors_data.js");
const researchPapers = require("./research_papers_data.js");
const paperAuthor = require("./paper_author_data.js");
const connection = require('./dbConfig.js');

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase(){
  const CREATE_RESEARCH_PAPERS = `
    CREATE TABLE IF NOT EXISTS research_papers (
      paper_id INT PRIMARY KEY NOT NULL,
        paper_title VARCHAR(500) NOT NULL UNIQUE,
        conference VARCHAR(100),
        publish_date DATE
    );`;

  const CREATE_PAPER_AUTHOR = `
    CREATE TABLE IF NOT EXISTS paper_author (
      paper_id INT NOT NULL,
      author_no INT NOT NULL,
      PRIMARY KEY (paper_id, author_no),
      FOREIGN KEY (author_no) REFERENCES authors(author_no),
      FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)
    );`;

  researchPapers.forEach(paper => {
    return paper.publish_date = randomDate(new Date(1900, 0, 1), new Date(2000, 0, 1))
  });

  connection.connect();

  try {
    await execQuery(CREATE_RESEARCH_PAPERS);
    await execQuery(CREATE_PAPER_AUTHOR);
    authors.forEach(async author => {
      await execQuery('INSERT INTO authors SET ?', author);
    });
    researchPapers.forEach(async paper => {
      await execQuery('INSERT INTO research_papers SET ?', paper);
    })
    paperAuthor.forEach(async paperAuthorLink => {
      await execQuery('INSERT INTO paper_author SET ?', paperAuthorLink);
    })
  } catch (error) { 
    console.error(error);
    connection.end();
  }
  
  connection.end();

}

seedDatabase();

function randomDate(start, end) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.getFullYear() + '-' + ('0' + (d.getMonth()+1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
}
