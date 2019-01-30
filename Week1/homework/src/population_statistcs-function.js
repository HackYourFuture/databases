const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function population_statistics(select_query, consoleMessage, value) {
  connection.connect();
  try {
    const result = await execQuery(select_query)
    const stringfiedData = JSON.stringify(result)
    console.log(consoleMessage)
    const parsedData = JSON.parse(stringfiedData)
    const formatedValue = parsedData[0][value].toLocaleString('en');
    console.log(formatedValue);
  } catch (error) {
    console.error(new Error(`this is error message : ${error}`));
  }
  connection.end();
}
module.exports = population_statistics;