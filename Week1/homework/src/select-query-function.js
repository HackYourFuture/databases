const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function select_function(select_query, consoleMessage) {
  connection.connect();
  try {
    const result = await execQuery(select_query)
    console.log(`  ${result.length}:${consoleMessage}`);
    for (let i = 0; i < result.length; i++) {
      console.log(` ${i+1 }, ${ result[i].name }`);
    }
  } catch (error) {
    console.error(new Error(`this is error message : ${error}`));
  }
  connection.end();
}

module.exports = select_function;