'use strict;';
var mysql = require('mysql');
const help = require('./help');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

connection.connect();

const select = process.argv[2];
const option = process.argv[3];
const region = process.argv[4];

switch (select) {
  case 'capital':
    select_query = `SELECT city.name FROM country, city WHERE (country.code = city.countrycode) AND (country.capital = city.id) AND (country.name = '${option}');`;
    break;
  case 'languages':
    select_query = `SELECT DISTINCT language FROM country, countrylanguage WHERE (countrycode = code) AND (region ='${option}');`;
    break;
  case 'total':
    select_query = `SELECT COUNT(*) AS number_of_cities FROM city LEFT JOIN countrylanguage ON (countrylanguage.countrycode = city.countrycode) WHERE (language ='${option}');`;
    break;
  case 'countries':
    select_query = `SELECT country.name FROM country, countrylanguage WHERE (country.Code = countrylanguage.CountryCode) AND (countrylanguage.language = '${option}') AND (country.region = '${region}');`;
    break;
  case 'continents':
    select_query = `SELECT continent, COUNT(*) AS languages FROM country LEFT JOIN countrylanguage ON (country.code = countrylanguage.countrycode) GROUP BY continent;`;
    break;
  case 'regions':
    select_query = `SELECT DISTINCT region from country;`;
    break;
  case 'help':
  default:
    select_query = help;
}
connection.query(select_query, function(error, results, fields) {
  if (error) {
    throw error;
  }

  for (i in results) {
    console.log(results[i]);
  }
});
connection.end();
