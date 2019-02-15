const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser2',
  password: 'class18password',
  database: 'new_world2',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function injectData() {
  const CREATE_USER_TABLE = `
  CREATE TABLE IF NOT EXISTS user(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL
  );`;

  const CREATE_TODOS_TABLE = `
  CREATE TABLE IF NOT EXISTS todos(
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   todos_name VARCHAR(50),
   user_id INT NOT NULL,
   FOREIGN KEY (user_id) REFERENCES user (id)
  );`;

  const CREATE_ITEMS_TABLE = `
  CREATE TABLE IF NOT EXISTS items (
    id INT NOT NULL  AUTO_INCREMENT PRIMARY KEY,
    item_info VARCHAR(50) NOT NULL,
    done BOOLEAN NOT NULL DEFAULT FALSE,
    todos_id INT NOT NULL,
    FOREIGN KEY (todos_id) REFERENCES todos(id)
  );`;

  const CREATE_REMINDER_TABLE = `
  CREATE TABLE IF NOT EXISTS reminder(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    time_reminder DATETIME,
    todos_id INT NOT NULL,
    FOREIGN KEY(todos_id) REFERENCES todos(id)
  );`;

  try {
    await execQuery(CREATE_USER_TABLE);
    await execQuery(CREATE_TODOS_TABLE);
    await execQuery(CREATE_REMINDER_TABLE);
    await execQuery(CREATE_ITEMS_TABLE);
  } catch (error) {
    console.error(error);
  }
}

injectData();

module.exports = {
  connection: connection,
  execQuery: execQuery,
};
