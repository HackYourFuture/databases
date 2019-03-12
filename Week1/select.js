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

if (retrieve('1')) select_query = 'select DISTINCT * from countries where population > 8000000';
else if (retrieve('2'))
  select_query = 'select DISTINCT * from countries where country_name like "%land%"';
else if (retrieve('3'))
  select_query = 'select DISTINCT * from cities where population between 500000 and 1000000';
else if (retrieve('4'))
  select_query = 'select DISTINCT * from countries where continent = "Europe"';
else if (retrieve('5'))
  select_query = 'select DISTINCT * from countries order by surface_area DESC';
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
