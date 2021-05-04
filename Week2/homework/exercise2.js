const util = require('util');
const mysql = require('mysql');

const research_Papers = require('./researchPaper');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'Password',
  database: 'class31',
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

  console.log(research_Papers);
  connection.connect();

  try {
    await execQuery(CREATE_TABLE_RESERCH_PAPERS);
    await Promise.all(
      research_Papers.map((element) =>
        execQuery('INSERT INTO research_Papers SET ?', element),
      ),
    );
  } catch (error) {
    console.error(error);
  }
  connection.end();
}
seedDatabase();
