const mysql = require('mysql2');

//set up the connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err.stack);
      return;
    }
    console.log('Connected to database!');
  });

// Fetch countries with population greater than 8 million
  connection.query(
    'SELECT Name FROM country WHERE Population > 8000000;',
    (err, results) => {
      if (err) throw err;
      console.log('Countries with population greater than 8 million:');
      console.log(results);
    }
  );

  // Fetch countries with "land" in
  connection.query(
    "SELECT Name FROM country WHERE Name LIKE '%land%';",
    (err, results) => {
      if (err) throw err;
      console.log('Countries with "land" in their names:');
      console.log(results);
    }
  );


// Cities with population between 500,000 and 1 million
connection.query(
    'SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;',
    (err, results) => {
      if (err) throw err;
      console.log('Cities with population between 500,000 and 1 million:');
      console.log(results);
    }
  );

  //Countries in Europe
  connection.query(
    "SELECT Name FROM country WHERE Continent = 'Europe';",
    (err, results) => {
      if (err) throw err;
      console.log('Countries in Europe:');
      console.log(results);
    }
  );

  // List countries in descending order of surface area
  connection.query(
    'SELECT Name FROM country ORDER BY SurfaceArea DESC;',
    (err, results) => {
      if (err) throw err;
      console.log('Countries by descending surface area:');
      console.log(results);
    }
  );

  // Cities in the Netherlands
  connection.query(
    "SELECT Name FROM city WHERE CountryCode = 'NLD';",
    (err, results) => {
      if (err) throw err;
      console.log('Cities in the Netherlands:');
      console.log(results);
    }
  );

  // Population of Rotterdam
  connection.query(
    "SELECT Population FROM city WHERE Name = 'Rotterdam';",
    (err, results) => {
      if (err) throw err;
      console.log('Population of Rotterdam:');
      console.log(results);
    }
  );

  // Top 10 countries by surface area
  connection.query(
    'SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10;',
    (err, results) => {
      if (err) throw err;
      console.log('Top 10 countries by surface area:');
      console.log(results);
    }
  );

  // Top 10 most populated cities
  connection.query(
    'SELECT Name FROM city ORDER BY Population DESC LIMIT 10;',
    (err, results) => {
      if (err) throw err;
      console.log('Top 10 most populated cities:');
      console.log(results);
    }
  );

  // world population
  connection.query(
    'SELECT SUM(Population) AS WorldPopulation FROM country;',
    (err, results) => {
      if (err) throw err;
      console.log('World population:');
      console.log(results[0].WorldPopulation);
    connection.end();
  });