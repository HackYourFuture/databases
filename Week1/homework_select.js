var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world'
});

connection.connect();

connection.query('SELECT country_name, population FROM countries where population > 8000000', function (error, results) {
  if (error) throw error.message;
  console.log('countries with population > 8 millions:\n ', results, '\n');
});

connection.query('SELECT country_name FROM countries where country_name like "%land%"', function (error, results) {
  if (error) throw error.message;
  console.log('countries contains "land" in their names:\n ', results, '\n');
});

connection.query('SELECT city_name, population FROM cities where population between 500000 and 1000000', function (error, results) {
  if (error) throw error.message;
  console.log('cities with population in between 500000 and 1000000:\n ', results, '\n');
});

connection.query('SELECT country_name,continent FROM countries where continent = "Europe"', function (error, results) {
  if (error) throw error.message;
  console.log('countries in the continent Europe:\n ', results, '\n');
});

connection.query('SELECT country_name,surface_area FROM countries order by surface_area desc ', function (error, results) {
  if (error) throw error.message;
  console.log('countries ordered descending by their areas:\n ', results, '\n');
});

connection.query('SELECT country_name,surface_area FROM countries order by surface_area desc ', function (error, results) {
  if (error) throw error.message;
  console.log('countries ordered descending by their areas:\n ', results, '\n');
});

connection.query('SELECT city_name  FROM cities where country_name ="Netherlands"', function (error, results) {
  if (error) throw error.message;
  console.log('cities in the netherlands:\n ', results, '\n');
});

connection.query('SELECT city_name, population  FROM cities where city_name ="Rotterdam"', function (error, results) {
  if (error) throw error.message;
  console.log('Population of Rotterdam:\n ', results, '\n');
});

connection.query('SELECT country_name , surface_area FROM countries order by surface_area desc limit 10', function (error, results) {
  if (error) throw error.message;
  console.log('top 10 countries by surface area:\n ', results, '\n');
});

connection.query('SELECT city_name , population FROM cities order by population desc limit 10', function (error, results) {
  if (error) throw error.message;
  console.log('top 10 most populated cities:\n ', results, '\n');
});

connection.query('SELECT  sum (population) as world_population FROM countries', function (error, results) {
  if (error) throw error.message;
  console.log('population of the world:\n ', results);
});
connection.end();