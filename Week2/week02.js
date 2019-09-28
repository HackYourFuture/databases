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

const queries = [
  'SELECT name FROM city WHERE id IN(SELECT capital FROM country WHERE name = ?);',
  'SELECT distinct language FROM countrylanguage WHERE countrycode IN (SELECT code FROM country WHERE region = ?);',
  'SELECT COUNT(name) AS "total cities" FROM city WHERE countrycode IN(SELECT countrycode FROM countrylanguage WHERE language = ?);',
  'SELECT name FROM country WHERE region = ? AND code IN(SELECT countrycode FROM countrylanguage WHERE language = ? AND isofficial = "T");',
  'SELECT name FROM country WHERE region = ? AND code IN(SELECT countrycode FROM countrylanguage WHERE language = ? AND isofficial = "T");',
];

connection.end();
