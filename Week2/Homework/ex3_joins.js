const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2",
  port: 3306,
});
connection.connect();
const SELECT_AUTHORS_MENTORS =
  "SELECT A1.author_name AS authors, A2.author_name AS mentors FROM authors AS A1 LEFT JOIN authors AS A2 ON A1.mentor = A2.author_no";
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const execQuery = util.promisify(connection.query.bind(connection));
  try {
    console.log("names of all authors and their corresponding mentors:");
    console.log(await execQuery(SELECT_AUTHORS_MENTORS));

    console.log("all columns of authors and their published paper_title:");
    console.log(await execQuery(SELECT_AUTHORS_PAPERS));
  } catch (error) {
    console.error(error.message);
    connection.end();
  }
  connection.end();
}
seedDatabase();
