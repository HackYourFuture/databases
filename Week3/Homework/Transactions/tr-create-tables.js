const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'ammar_week3_database',
});

// Promisify the bind function of query function of connection object
// Pass connection object (because bind expects "this")
// Afterwards execQuery will work as a function that returns a promise but
// we don't have to call "then" over that promise
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_ACCOUNT_TABLE = `
    CREATE TABLE IF NOT EXISTS account  (
        account_number INT,
        balance INT,
        PRIMARY KEY (account_number)
    );`;
  const CREATE_ACCOUNT_CHANGE_TABLE = `
    CREATE TABLE IF NOT EXISTS account_change (
        change_number INT,
        account_number INT,
        amount INT,
        changed_date DATE,
        remark TEXT
    );`;

  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(CREATE_ACCOUNT_TABLE);
    await execQuery(CREATE_ACCOUNT_CHANGE_TABLE);
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
