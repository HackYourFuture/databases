const mysql = require("mysql");

// Create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hyfpassword",
  database: `world`,
});

// Connect
connection.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected...");
});

// Adding query for Database
const addQuery = (query) => {
  connection.query(query, (error, result) => {
    if (error) throw error;
    console.log(result);
  });
};

const queries = [
  `SELECT name FROM country WHERE population > 8000000`,
  `SELECT name FROM country WHERE name LIKE '%land%'`,
  `SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000`,
  `SELECT name FROM country WHERE continent = 'Europe'`,
  `SELECT name, surfaceArea FROM country ORDER BY surfaceArea DESC`,
  `SELECT name FROM city WHERE countryCode = 'NLD'`,
  `SELECT population FROM city WHERE name = 'Rotterdam'`,
  `SELECT name FROM country ORDER BY SurfaceArea DESC LIMIT 10`,
  `SELECT Name FROM city ORDER BY Population DESC LIMIT 10`,
  `SELECT SUM(population) AS WorldPopulation FROM country`,
];

queries.forEach((query) => addQuery(query, `Query is created`));

connection.end();
