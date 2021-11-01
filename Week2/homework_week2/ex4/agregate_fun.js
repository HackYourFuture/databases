import { createConnection } from "mysql";

const connection = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "papers",
});
async function alterTables() {
  const authorCount = `SELECT paper_title, COUNT(*) FROM authors JOIN research_papers ON authors.author_no = research_papers.author_no GROUP BY paper_id;`;
  const sumFemaleAuthors = `SELECT COUNT(*) AS 'Research papers from females'  FROM authors JOIN research_papers ON authors.author_no = research_papers.author_no WHERE gender = 'f';`;
  const avgHIndex = `SELECT  university, AVG(h_index) FROM authors GROUP BY university; `;
  const papersPerUniversity = `SELECT university, COUNT(paper_title) FROM authors JOIN research_papers ON authors.author_no = research_papers.author_no GROUP BY university;`;
  const minMaxIndex = `SELECT  university, MIN(h_index) AS 'Lowest h_index',MAX(h_index) AS 'Higher h_index'  FROM authors GROUP BY university; `;
  connection.connect();
  try {
    await Promise.all[
      ((((connection.query(authorCount, (error, results) => {
        error ? error : console.log(JSON.stringify(results));
      }),
      connection.query(sumFemaleAuthors, (error, results) => {
        error ? error : console.log(JSON.stringify(results));
      })),
      connection.query(avgHIndex, (error, results) => {
        error ? error : console.log(JSON.stringify(results));
      })),
      connection.query(papersPerUniversity, (error, results) => {
        error ? error : console.log(JSON.stringify(results));
      })),
      connection.query(minMaxIndex, (error, results) => {
        error ? error : console.log(JSON.stringify(results));
      }))
    ];
  } catch (error) {
    console.error(error);
  }
  connection.end();
}
alterTables();
