const mysql = require("mysql");


const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});


connection.query(
    'SELECT Name FROM country WHERE Population > 8000000',
    function(err, results) {
      if (err) throw err;
      console.log('Question 1: Countries with population greater than 8 million:');
    }
  );
  
  
  connection.query(
    'SELECT Name FROM country WHERE Name LIKE "%land%"',
    function(err, results) {
      if (err) throw err;
      console.log('Question 2: Countries with "land" in their names:');
      console.log(results);
    }
  );
  
  
  connection.query(
    'SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000',
    function(err, results) {
      if (err) throw err;
      console.log('Question 3: Cities with population between 500,000 and 1 million:');
      console.log(results);
    }
  );
  
  
  connection.query(
    'SELECT Name FROM country WHERE Continent = "Europe"',
    function(err, results) {
      if (err) throw err;
      console.log('Question 4: Countries on the continent "Europe":');
      console.log(results);
    }
  );
  
  
  connection.query(
    'SELECT Name FROM country ORDER BY SurfaceArea DESC',
    function(err, results) {
      if (err) throw err;
      console.log('Question 5: Countries in descending order of surface areas:');
      console.log(results);
    }
  );
  
  
  connection.query(
    'SELECT Name FROM city WHERE CountryCode = "NLD"',
    function(err, results) {
      if (err) throw err;
      console.log('Question 6: Cities in the Netherlands:');
      console.log(results);
    }
  );
  
  
  connection.query(
    'SELECT Population FROM city WHERE Name = "Rotterdam"',
    function(err, results) {
      if (err) throw err;
      console.log('Question 7: Population of Rotterdam:');
      console.log(results);
    }
  );
  
  
  connection.query(
    'SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10',
    function(err, results) {
      if (err) throw err;
      console.log('Question 8: Top 10 countries by Surface Area:');
      console.log(results);
    }
  );
  
  
  connection.query(
    'SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10',
    function(err, results) {
      if (err) throw err;
      console.log('Question 9: Top 10 most populated cities:');
      console.log(results);
    }
  );
  
  
  connection.query(
    'SELECT SUM(Population) AS totalPopulation FROM country',
    function(err, results) {
      if (err) throw err;
      console.log('Question 10: Total population of the world:');
      console.log(results);
    }
  );
  
  
  connection.end(function(err) {
    if (err) throw err;
    console.log('Connection  closed.');
  });