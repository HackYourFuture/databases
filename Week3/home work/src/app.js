const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo',
});


async function createandinsert() {
  const CREATE_USER_TABLE = `
    `;
  const CREATE_TODO_TASK_TABLE = `
    `;
  const CREATE_TODO_LIST_TABLE = `
   `;
}
const execQuery = util.promisify(connection.query.bind(connection));