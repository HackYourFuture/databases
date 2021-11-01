import { createConnection } from "mysql";

const connection = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "papers",
});

//show all authors and their mentors
async function multipleQueries() {
  const authorAndMentor = `SELECT author_name, mentor_name FROM authors JOIN mentors ON authors.author_no = mentors.mentor;`;
  const authorAndPaper = `SELECT author_name, paper_title FROM authors JOIN research_Papers ON authors.author_no = research_Papers.author_no;`;
  connection.connect();
  try {
    await Promise.all[
      (connection.query(authorAndMentor, (error, results) => {
        error ? error : console.log(JSON.stringify(results));
      }),
      connection.query(authorAndPaper, (error, results) => {
        error ? error : console.log(JSON.stringify(results));
      }))
    ];
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

multipleQueries();
