const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

connection.connect();

// What are the names of countries with population greater than 8 million?
connection.query(
  "SELECT name FROM country WHERE population > 8000000",
  (error, results, fields) => {
    if (error) throw error;
    console.log("The result is: ", results);
  }
);
// What are the names of countries that have 'land' in their names?
connection.query(
  "SELECT name FROM country WHERE name LIKE '%land%'",
  (error, results, fields) => {
    if (error) throw error;
    console.log("The result is: ", results);
    console.log("The fields are: ", fields);
  }
);

// What are the names of the cities with population in between 500,000 and 1 million?
const sql = "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000";
connection.query(sql, (err, results, fields) => {
  if (err) throw err;
  console.log("The City between 500k and 1ml", results);
});

// What's the name of all the countries on the continent 'Europe'?
const sql1 = "SELECT name FROM country WHERE continent = 'Europe'";
connection.query(sql1, (err, results, fields) => {
  if (err) throw err;
  console.log("The Countries on the Europa", results);
});

// List all the countries in the descending order of their surface areas.
const sql2 = "select * from country order by surfacearea desc limit 6";
connection.query(sql2, (err, results, fields) => {
  if (err) throw err;
  console.log("The Countries Desc: ", results);
});

// What are the names of all the cities in the Netherlands?
const sql3 = "select name from city where countrycode = 'NLD'";
connection.query(sql3, (err, results) => {
  if (err) throw err;
  console.log("The NLD cities: ", results);
});

// What is the population of Rotterdam?
const sql4 = "select population from city where name = 'Rotterdam'";
connection.query(sql4, (err, results) => {
  if (err) throw err;
  console.log("Rotterdam Population: ", results[0].population);
});

// What's the top 10 countries by Surface Area?
const sql5 = "select * from country order by surfacearea desc limit 10";
connection.query(sql5, (err, results, fields) => {
  if (err) throw err;
  console.log("First 10 country by surfacearea", results);
});

// What's the top 10 most populated cities?
const sql6 = "select * from city order by population desc limit 10";
connection.query(sql6, (err, results, fields) => {
  if (err) throw err;
  console.log("Top 10 City by Population", results);
});

// What is the population number of the world?
const sql7 =
  "select name from country where population = (select max(population) from country)";
connection.query(sql7, (err, results) => {
  if (err) throw err;
  console.log("The World Population", results);
});

const sql8 =
  "select name from country where population = (select max(population) from country)";
connection.query(sql8, (err, results) => {
  if (err) throw err;
  console.log("The World Population", results);
});

connection.end();
