const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2",
  port: 3306,
});

const execQuery = util.promisify(connection.query.bind(connection));
async function creatDatabases() {
  const create_authors_table =
    "CREATE TABLE IF NOT EXISTS authors (author_no int auto_increment PRIMARY KEY, author_name varchar(225), university varchar(225), date_of_birth data, h_index int, gender enum('m', 'f'))";
  const alter_authors_table =
    "ALTER TABLE authors ADD COLUMN mentor int, ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCE authors (author_no)";

  connection.connect();
  try {
    await execQuery(create_authors_table);
    await execQuery(alter_authors_table);
  } catch (error) {
    console.log(error);
    connection.end();
  }
  connection.end();
}
creatDatabases();
