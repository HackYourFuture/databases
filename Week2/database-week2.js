const util = require('util');
const mysql = require('mysql');
const { getData } = require('./data.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  try {
    console.log('\n');
    connection.connect();

    await execQuery('use new_world');
    const dataSet = await getData();
    dataSet.forEach(async data => {
      const result = await execQuery(data.query, data.input);
      console.log('QUESTION : ' + data.question);
      console.log('QUERY : ' + data.query);
      console.log('INPUT : ' + data.input + '\n');
      console.log('############################-RESULTS-############################\n');
      console.log(result);
      console.log('\n');
    });
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
