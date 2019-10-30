const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'world',
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected...');
});

function sendQuery(query) {
  connection.query(query, (err, results, fields) => {
    if (err) throw err;
    for (i in results) {
      console.log(results[i]);
    }
  });
}

// Case4.a: What are the names of the countries with population greater than 8 million?
const case4A = 'SELECT Name, Population FROM country WHERE Population > 8000000;';
sendQuery(case4A);

// Case4.b: What are the names of the countries that have “land” in their names
const case4B = 'SELECT Name As Have_Land_In_Their_Name FROM country WHERE Name like "%land%";';
sendQuery(case4B);

//Case4.c: What are the names of the cities with population in between 500,000 and 1 million?
const case4C = 'SELECT Name, Population FROM city WHERE Population BETWEEN 500000 AND 1000000;';
sendQuery(case4C);

//Case4.d: What are the names of all the countries on the continent ‘Europe’?
const case4D = `SELECT Name As European_Countries FROM country WHERE Continent = 'Europe';`;
sendQuery(case4D);

//Case4.e: List all the countries in the descending order based on their surface areas.
const case4E = `SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;`;
sendQuery(case4E);

//Case5.a: What are the names of all the cities in the Netherlands?
const case5A = `SELECT Name As Netherlands_Cities FROM city WHERE CountryCode = 'NLD';`;
sendQuery(case5A);

//Case5.b: What's the population of Rotterdam?
const case5B = `SELECT Name, Population FROM city WHERE name = 'Rotterdam';`;
sendQuery(case5B);

//Case5.c: What's the top 10 countries based on surface area?
const case5C = `SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;`;
sendQuery(case5C);

//Case5.d: What's the top 10 cities with the highest population?
const case5D = `SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10;`;
sendQuery(case5D);

//Case5.e: What's the population of the world ?
var case5E = 'SELECT SUM(Population) FROM country';
sendQuery(case5E);

//
connection.end();
