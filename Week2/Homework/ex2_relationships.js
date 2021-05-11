const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2",
  port: 3306,
});
// the relationships between the authors and the research papers is M to M , because more than one author can write one paper,
//also one authors can write many papers

const execQuery = util.promisify(connection.query.bind(connection));
async function creatDatabases() {
  const create_research_papers_table =
    "CREATE TABLE IF NOT EXISTS research_papers(paper_id int, paper_title varchar(225), conference varchar(225), publish_date date,) ";
  const create_authors_research_table =
    "CREATE TABLE IF NOT EXISTS authors_research_papers(author_no int not null, research_paper_no int not null, constraint fk_author foreign key(author_no) references authors(author_no), constraint fk_paper foreign key(research_paper_no) references research_papers(paper_id), primary key(author_no, research_paper_no))";

  connection.connect();
  try {
    await execQuery(create_research_papers_table);
    await execQuery(create_authors_research_table);
  } catch (error) {
    console.log(error);
    connection.end();
  }
  connection.end();
}
creatDatabases();
