const util = require('util');
const mysql = require('mysql');
const handleErrorAndData = require('./error');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ghufran',
  password: 'deiri',
  database: 'todos',
});

connection.connect(handleErrorAndData('Successfully connected!'));

const execQuery = util.promisify(connection.query.bind(connection));

async function executeQuery(query, arg) {
  try {
    return await execQuery(query, arg);
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

const errorHandler = async error => {
  if (error) {
    if (error.code === 'EN0ENT') {
      console.log('no data found');
    } else console.error(error);
    response.status(500).send('some problem.');
  }
};

const getQueryResult = results => {
  const result = results[0][Object.keys(results[0])];
  return result;
};

module.exports = { executeQuery, errorHandler, getQueryResult };
