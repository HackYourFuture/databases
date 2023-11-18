const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',      // Replace with your MySQL host
  user: 'hyfuser',  // Replace with your MySQL username
  password: 'hyfpassword',  // Replace with your MySQL password
  database: 'world'       // Replace with your database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Query 1: Countries with population greater than 8 million
connection.query('SELECT name FROM country WHERE population > 8000000', (err, results) => {
  if (err) throw err;
  console.log('Countries with population greater than 8 million:', results);
});

// Query 2: Countries with "land" in their names
connection.query('SELECT name FROM country WHERE name LIKE "%land%"', (err, results) => {
  if (err) throw err;
  console.log('Countries with "land" in their names:', results);
});

// Query 3: Cities with population between 500,000 and 1 million
connection.query('SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000', (err, results) => {
  if (err) throw err;
  console.log('Cities with population between 500,000 and 1 million:', results);
});

// Query 4: Countries in Europe
connection.query('SELECT name FROM country WHERE continent = "Europe"', (err, results) => {
  if (err) throw err;
  console.log('Countries in Europe:', results);
});

// Query 5: Countries in descending order of surface areas
connection.query('SELECT name FROM country ORDER BY some_other_column DESC', (err, results) => {
  if (err) throw err;
  console.log('Countries in descending order of some_other_column:', results);
});

// Query 6: Cities in the Netherlands
connection.query('SELECT name FROM city WHERE countrycode = "NLD"', (err, results) => {
  if (err) throw err;
  console.log('Cities in the Netherlands:', results);
});

// Query 7: Population of Rotterdam
connection.query('SELECT population FROM city WHERE name = "Rotterdam"', (err, results) => {
  if (err) throw err;
  console.log('Population of Rotterdam:', results[0].population);
});

// Query 8: Top 10 countries by surface area
connection.query('SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10', (err, results) => {
  if (err) throw err;
  console.log('Top 10 countries by surface area:', results);
});

// Query 9: Top 10 most populated cities
connection.query('SELECT name FROM city ORDER BY population DESC LIMIT 10', (err, results) => {
  if (err) throw err;
  console.log('Top 10 most populated cities:', results);
});

// Query 10: Population of the world
connection.query('SELECT SUM(population) AS world_population FROM country', (err, results) => {
  if (err) throw err;
  console.log('Population of the world:', results[0].world_population);
});

// Close the MySQL connection
connection.end();
