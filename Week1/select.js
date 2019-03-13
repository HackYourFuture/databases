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

const args = process.argv;
args.splice(0, 2);
const retrieve = argument => args.includes(argument);


if (retrieve('1'))
  select_query =
    'SELECT DISTINCT country_name, population FROM countries WHERE population > 8000000 ORDER BY population ASC';
else if (retrieve('2'))
  select_query = 'SELECT DISTINCT country_name FROM countries WHERE country_name LIKE "%land%"';
else if (retrieve('3'))
  select_query =
    'SELECT DISTINCT city_name, population FROM cities WHERE population BETWEEN 500000 AND 1000000 ORDER BY population ASC';
else if (retrieve('4'))
  select_query =
    'SELECT DISTINCT country_name, continent From countries WHERE continent = "Europe"';
else if (retrieve('5'))
  select_query =
    'SELECT DISTINCT country_name, surface_area FROM countries ORDER BY surface_area DESC';
else if (retrieve('help')) select_query = help;
else select_query = help;


connection.query(select_query, function(error, results, fields) {
  if (error) {
    throw error;
  }

  for (i in results) {
    console.log(results[i]);
  }
});
connection.end();
