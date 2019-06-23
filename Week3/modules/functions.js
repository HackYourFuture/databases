const util = require('util');
const mysql = require('mysql');

function execute() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tododatabase',
  });

  connection.connect(err => {
    if (err) throw err;
    console.log('database is connected');
  });

  return util.promisify(connection.query.bind(connection));
}

const execQuery = execute();

async function checkId(tableName, id) {
  try {
    await execQuery(`use tododatabase`);
    const selectedRow = `select ID from ${tableName} where ID = ?`;
    const result = await execQuery(selectedRow, id);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = { execQuery, checkId };
