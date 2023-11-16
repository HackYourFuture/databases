const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'your_database_host',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'world'
});

// Connect to the database
connection.connect();

// Query 1: Countries with population greater than 8 million
connection.query('SELECT Name FROM country WHERE Population > 8000000', (error, results) => {
  if (error) throw error;
  console.log('Countries with population greater than 8 million:', results);
});

// Query 2: Countries with "land" in their names
connection.query('SELECT Name FROM country WHERE Name LIKE "%land%"', (error, results) => {
  if (error) throw error;
  console.log('Countries with "land" in their names:', results);
});

// Query 3: Cities with population between 500,000 and 1 million
connection.query('SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000', (error, results) => {
  if (error) throw error;
  console.log('Cities with population between 500,000 and 1 million:', results);
});

// Query 4: Countries in Europe
connection.query('SELECT Name FROM country WHERE Continent = "Europe"', (error, results) => {
  if (error) throw error;
  console.log('Countries in Europe:', results);
});

// Query 5: Countries in descending order of surface areas
connection.query('SELECT Name FROM country ORDER BY SurfaceArea DESC', (error, results) => {
  if (error) throw error;
  console.log('Countries in descending order of surface areas:', results);
});

// Query 6: Cities in the Netherlands
connection.query('SELECT Name FROM city WHERE CountryCode = "NLD"', (error, results) => {
  if (error) throw error;
  console.log('Cities in the Netherlands:', results);
});

// Query 7: Population of Rotterdam
connection.query('SELECT Population FROM city WHERE Name = "Rotterdam"', (error, results) => {
  if (error) throw error;
  console.log('Population of Rotterdam:', results[0].Population);
});

// Query 8: Top 10 countries by surface area
connection.query('SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10', (error, results) => {
  if (error) throw error;
  console.log('Top 10 countries by surface area:', results);
});

// Query 9: Top 10 most populated cities
connection.query('SELECT Name FROM city ORDER BY Population DESC LIMIT 10', (error, results) => {
  if (error) throw error;
  console.log('Top 10 most populated cities:', results);
});

// Query 10: Population number of the world
connection.query('SELECT SUM(Population) AS WorldPopulation FROM country', (error, results) => {
  if (error) throw error;
  console.log('Population number of the world:', results[0].WorldPopulation);
});

// Close the connection
connection.end();
