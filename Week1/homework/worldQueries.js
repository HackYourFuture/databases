const mysql = require('mysql');

// Create the connection
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world',
  // port : 3307
});
connection.connect();

// write function to avoid repetition of the code
function getResults(sql) {
  connection.query(sql, (err, results) => {
    if (err) {
      return console.error(err.message);
    }
   console.log(results)})
};

// What are the names of countries with population greater than 8 million?
const sql1 = "SELECT Name FROM country WHERE Population > 8000000";
getResults(sql1);

//What are the names of countries that have “land” in their names?
const sql2 = "SELECT Name FROM country WHERE Name LIKE '%land%'";
getResults(sql2);

//What are the names of the cities with population in between 500,000 and 1 million?
const sql3 = "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000";
getResults(sql3);

//What's the name of all the countries on the continent ‘Europe’?
const sql4 = "SELECT Name FROM country WHERE Continent = 'Europe'";
getResults(sql4);

// List all the countries in the descending order of their surface areas.
const sql5 = "SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC";
getResults(sql5);

// What are the names of all the cities in the Netherlands?
const sql6 = "SELECT Name FROM city WHERE CountryCode = 'NLD'";
getResults(sql6);

// What is the population of Rotterdam?
const sql7 = "SELECT Name, Population FROM city WHERE Name = 'Rotterdam'";
getResults(sql7);

// What's the top 10 countries by Surface Area?
const sql8 = "SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10";
getResults(sql8);

// What's the top 10 most populated cities?
const sql9 = "SELECT Name, Population FROM country ORDER BY Population DESC LIMIT 10";
getResults(sql9);

// What is the population number of the world?
const sql10 = "SELECT SUM(Population) as 'population_of_World' FROM country";
getResults(sql10);

// end the connection
connection.end();