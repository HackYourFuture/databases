const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));

connection.connect();

async function submitQueries() {
  const queries = [
    'SELECT name FROM city WHERE id IN(SELECT capital FROM country WHERE name = ?);',
    'SELECT distinct language FROM countrylanguage WHERE countrycode IN (SELECT code FROM country WHERE region = ?);',
    'SELECT COUNT(name) AS "total cities" FROM city WHERE countrycode IN(SELECT countrycode FROM countrylanguage WHERE language = ?);',
    'SELECT name FROM country WHERE region = ? AND code IN(SELECT countrycode FROM countrylanguage WHERE language = ? AND isofficial = "T");',
    'SELECT country.continent, COUNT(DISTINCT countrylanguage.language) AS FROM country JOIN countrylanguage ON country.code = countrylanguage.countrycode GROUP BY country.continent);',
  ];

  connection.connect();

  try {
    queries.forEach(async queries => {
      await execQuery('running', queries);
    });
  } catch (error) {
    console.error(error);
  }

  connection.end();
}
submitQueries();
