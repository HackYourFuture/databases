'use-strict';

const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const execQuery = util.promisify(connection.query.bind(connection));
async function createTable_and_Insert(createTable_query, insert_query, array_insertValues) {
  connection.connect();
  try {
    await execQuery(createTable_query);
    array_insertValues.forEach(async element => {
      await execQuery(insert_query, element);
    });
    console.log('Table Created')
  } catch (error) {
    console.error(new Error(`this is error message : ${error}`));
  }

  connection.end();
}

module.exports = createTable_and_Insert;