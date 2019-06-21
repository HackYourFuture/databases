const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function executeQuery(query, arg) {
  try {
    return await execQuery(query, arg);
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

const errorHandle = async error => {
  if (error) {
    if (error.code === 'EN0ENT') {
      console.log('no data found');
    } else console.error(error);
    response.status(500).send('some problem.');
  }
};

const getQueryResult = result => {
  const first = result[0][Object.keys(result[0])];
  return first;
};

module.exports = { executeQuery, errorHandle, getQueryResult };
