'use strict;';
var mysql = require('mysql');
const help = require('./help');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

connection.connect();

const select = process.argv.splice(2);

switch (select[0]) {
  case '1':
    select_query =
      'SELECT name_en, population FROM countries WHERE population > 8000000 ORDER BY population DESC';
    break;
  case '2':
    select_query = 'SELECT name_en FROM countries WHERE name_en LIKE "%land%"';
    break;
  case '3':
    select_query =
      'SELECT city_name, population FROM cities WHERE population BETWEEN 500000 AND 1000000 ORDER BY population DESC';
    break;
  case '4':
    select_query = 'SELECT name_en, continent From countries WHERE continent = "Europe"';
    break;
  case '5':
    select_query = 'SELECT name_en, area FROM countries ORDER BY area DESC';
    break;
  case '6':
    select_query = 'SELECT  city_name FROM cities LIMIT 20';
    break;
  case '7':
    select_query = 'SELECT city_name, population FROM cities WHERE city_name = "Rotterdam"';
    break;
  case '8':
    select_query = 'SELECT name_en, area FROM countries ORDER BY area DESC LIMIT 10';
    break;
  case '9':
    select_query = 'SELECT city_name, population FROM cities ORDER BY population DESC LIMIT 10';
    break;
  case '10':
    select_query = 'SELECT SUM (population) AS population_of_the_world FROM countries';
    break;
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
