const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2",
  port: 3306,
});
const execQuery = util.promisify(connection.query.bind(connection));
connection.connect();
const SELECT_NUMBER_AUTHORS_PAPERS =
  "SELECT research_papers.paper_title AS research_papers, COUNT(authors.author_name) AS authors_number FROM research_papers LEFT JOIN authors_research_papers ON research_paper_no = research_papers.paper_id GROUP BY paper_title";
const SUM_FEMALE_PAPERS =
  "SELECT COUNT(research_papers.paper_title) AS females_papers FROM research_papers LEFT JOIN authors_research_papers ON research_paper_no = research_papers.paper_id LEFT JOIN authors ON authors_research_papers.author_no = authors.author_no WHERE gender = 'f'";
const H_INDEX_AVERAGE =
  "SELECT university,AVG(h_index) AS average FROM authors GROUP BY university;";
const SUM_PAPERS_UNIVERSITY =
  "SELECT university,COUNT(research_papers.paper_title) AS research_papers FROM research_papers LEFT JOIN authors_research_papers ON research_paper_no = research_papers.paper_id LEFT JOIN authors on authors_research_papers.author_no = authors.author_no GROUP BY university";
const H_INDEX_MIN_MAX =
  "SELECT university, MAX(h_index), MIN(h_index) FROM authors GROUP BY university;";

async function seedDatabase() {
  try {
    console.log(
      "All research papers and the number of authors that wrote that paper.:"
    );
    console.log(await execQuery(SELECT_NUMBER_AUTHORS_PAPERS));

    console.log("Sum of the research papers published by all female authors.:");
    console.log(await execQuery(SUM_FEMALE_PAPERS));

    console.log("Average of the h-index of all authors per university:");
    console.log(await execQuery(H_INDEX_AVERAGE));

    console.log("Sum of the research papers of the authors per university:");
    console.log(await execQuery(SUM_PAPERS_UNIVERSITY));

    console.log(
      "Minimum and maximum of the h-index of all authors per university:"
    );
    console.log(await execQuery(H_INDEX_MIN_MAX));
  } catch (error) {
    console.error(error.message);
    connection.end();
  }
  connection.end();
}

seedDatabase();
