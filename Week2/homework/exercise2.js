const util = require('util');
const mysql = require('mysql');

const authors = require('./data/authors');
const research_Papers = require('./data/researchPaper');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'Password',
  database: 'Class31',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_TABLE_RESERCH_PAPERS = `
    CREATE TABLE IF NOT EXISTS research_Papers (
    paper_id INT(100),
    paper_title VARCHAR(200),
    conference VARCHAR(200),
    publish_date DATE
      );`;
  const CREATE_TABLE_AUTHORS = `
    CREATE TABLE IF NOT EXISTS authors (
    author_no int primary Key,
    author_name varchar(30),
    university varchar(50),
    date_of_birth DATE,
    h_index int,
    gender ENUM ("MALE", "FEMALE"),
    mentor int,
    CONSTRAINT fk_auth FOREIGN KEY (mentor) REFERENCES authors(author_no)
    );`;

  connection.connect();

  try {
    await Promise.all[
      (execQuery(CREATE_TABLE_RESERCH_PAPERS), execQuery(CREATE_TABLE_AUTHORS))
    ];
    await Promise.all(
      research_Papers.map((paper) =>
        execQuery('INSERT INTO research_Papers SET ?', paper),
      ),
    );
    await Promise.all(
      authors.map((author) => execQuery('INSERT INTO authors SET ?', author)),
    );
  } catch (error) {
    console.error(error);
  }
  connection.end();
}
seedDatabase();
