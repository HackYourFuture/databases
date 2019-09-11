var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'myworld'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('db connected');
  });

// Question 4i: What are the names of the countries with population greater than 8 million
let result4i = 'SELECT Name FROM Country WHERE Population > 8000000;'

connection.query(result4i, function(error, data) {
  if (error) {
    throw error;
  }
  console.log(data);
});

// Question 4ii: What are the names of the countries that have “land” in their names ?
let result4ii = "SELECT Name FROM Country WHERE Name like '%land%';"

connection.query(result4ii, function(error, data) {
  if (error) {
    throw error;
  }
  console.log(data);
});

// Question 4iii: What are the names of the cities with population in between 500,000 and 1 million ?
let result4iii = "SELECT Name FROM City WHERE Population BETWEEN 500000 AND 1000000;"

connection.query(result4iii, function(error, data) {
  if (error) {
    throw error;
  }
  console.log(data);
});

// Question 4iv: What are the names of all the countries on the continent ‘Europe’ ?
let result4iv = "SELECT Name FROM Country WHERE Continent = 'Europe';"

connection.query(result4iv, function(error, data) {
  if (error) {
    throw error;
  }
  console.log(data);
});

// Question 4v: List all the countries in the descending order based on their surface areas.
let result4v = "SELECT * FROM Country  ORDER BY SurfaceArea DESC;"

connection.query(result4v, function(error, data) {
  if (error) {
    throw error;
  }
  console.log(data);
});

// Question 5i: What are the names of all the cities in the Netherlands?
let result5i = "SELECT Name FROM City WHERE CountryCode = 'NLD';"

connection.query(result5i, function(error, data) {
  if (error) {
    throw error;
  }
  console.log(data);
});

// Question 5ii: What's the population of Rotterdam?
let result5ii = "SELECT Population  FROM City WHERE Name = 'Rotterdam';"

connection.query(result5ii, function(error, data) {
  if (error) {
    throw error;
  }
  console.log(data);
});

// Question 5iii: What's the top 10 countries based on surface area?
let result5iii = "SELECT Name, SurfaceArea FROM country ORDER BY 2 DESC LIMIT 10;"

connection.query(result5iii, function(error, data) {
  if (error) {
    throw error;
  }
  console.log(data);
});

// Question 5iv: What's the top 10 cities with the highest population?
let result5iv = "SELECT Name, Population FROM city ORDER BY 2 DESC LIMIT 10;"

connection.query(result5iv, function(error, data) {
  if (error) {
    throw error;
  }
  console.log(data);
});

// Question 5v: What's the population of the world
let result5v = "SELECT SUM(Population) AS PopulationOfTheWorld FROM Country;"

connection.query(result5v, function(error, data) {
  if (error) {
    throw error;
  }
  console.log(data);
});

connection.end();