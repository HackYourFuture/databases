var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'myWorld',
});
connection.connect(function(err) {
  if (err) throw err;
  console.log('db connected');
});
//Question 4
var result4i = 'SELECT country_name FROM country WHERE population > 8000000;';
connection.query(result4i, function(error, resolve) {
  if (error) {
    throw error;
  }
  console.log('countries with population greater than 8000000;', resolve);
});
var result4ii = `SELECT country_name FROM country WHERE country_name LIKE '%land%';`;
connection.query(result4ii, function(error, resolve) {
  if (error) {
    throw error;
  }
  console.log('countries contain land in their name', resolve);
});
var result4iii = 'SELECT city_name FROM city WHERE population BETWEEN 500000 AND 1000000;';
connection.query(result4iii, function(error, resolve) {
  if (error) throw error;
  console.log('cities with population between 500000 and 1000000', resolve);
});
var result4iv = `SELECT country_name FROM country WHERE continent = 'Europe';`;
connection.query(result4iv, function(error, resolve) {
  if (error) throw error;
  console.log('country with the continent Europe', resolve);
});
var result4v = `SELECT country_name FROM country ORDER BY SurfaceArea DESC;`;
connection.query(result4v, function(error, resolve) {
  if (error) throw error;
  console.log('countries ordered by surface area', resolve);
});
//question 5
var result5i = 'SELECT city_name FROM city WHERE countryCode ="Nld"';
connection.query(result5i, function(error, resolve) {
  if (error) throw error;
  console.log('cities of Nederland', resolve);
});
var result5ii = 'SELECT population from city WHERE city_name = "Rotterdam"';
connection.query(result5ii, function(error, resolve) {
  if (error) throw error;
  console.log('the population of Rotterdam city', resolve);
});
var result5iii = 'SELECT country_name FROM country ORDER BY SurfaceArea DESC LIMIT 10';
connection.query(result5iii, function(error, resolve) {
  if (error) throw error;
  console.log(' top 10 countries based on surface area', resolve);
});
var result5iv = 'SELECT city_name FROM city ORDER BY Population DESC LIMIT 10';
connection.query(result5iv, function(error, resolve) {
  if (error) throw error;
  console.log(' top 10 cities with the highest population', resolve);
});
var result5v = 'SELECT SUM(population) FROM country';
connection.query(result5v, function(error, resolve) {
  if (error) throw error;
  console.log(' population of the world', resolve);
});
connection.end();
