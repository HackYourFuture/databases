'use strict';

const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function queries() {
  connection.connect();
  try {
    const query1 = await execQuery(
      'select name, population from countries where population > 8000000',
    );

    const query2 = await execQuery('select name from countries where name like "%land%"');

    const query3 = await execQuery(
      'select name, population from cities where population > 500000 and population < 1000000',
    );

    const query4 = await execQuery('select name, continent from countries where continent = "EU"');
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

queries();
