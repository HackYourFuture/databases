var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

function sendQuery(query) {
  connection.query(query, function(error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('the reply is ', results[0]);
  });
}

connection.connect();

//Create a table called 'country'. Make a column (and define the appropriate data type)
var create_country =
  'create table country (name varchar(50), Continent varchar(50), Region varchar(50), Surface_Area int, Indep_year date, Population int, Life_Expectancy float, GNP float, GNPOld float, Local_Name varchar(50), Government_form varchar(50), Head_of_state varchar(50), Capital varchar(50))';
sendQuery(create_country);

var insert_country = [
  "INSERT INTO country VALUES ('Netherlands', 'Europe', 'Western Europe', 800, '1581-01-01', 17035938, 78.3, NULL, NULL, NULL, 'Constitutional Monarchy', NULL, 'Amsterdam')",
  "INSERT INTO country VALUES ('Afghanistan', 'Asia', 'Southern and Central Asia', 652090, '1919-01-01', 35530081, 45.9, NULL, NULL, NULL, 'Islamic Emirate', NULL, 'Kabul')",
  "INSERT INTO country VALUES ('Romania', 'Europe', 'Eastern Europe', 238391, '1878-01-01', 19679306, 69.9, NULL, NULL, NULL, 'Republic', NULL, 'Bucharest')",
  "INSERT INTO country VALUES ('Switzerland', 'Europe', 'Western Europe', 41284, '1499-01-01', 8476005, 79.6, NULL, NULL, NULL, 'Federation', NULL, 'Bern')",
  "INSERT INTO country VALUES ('Sweden', 'Europe', 'Nordic Countries', 449964, '836-01-01', 9910701, 79.6, NULL, NULL, NULL, 'Constitutional Monarchy', NULL, 'Stockholm')",
  "INSERT INTO country VALUES ('Syria', 'Asia', 'Middle East', 185180, '1941-01-01', 18269868, 68.5, NULL, NULL, NULL, 'Republic', NULL, 'Damascus')",
  "INSERT INTO country VALUES ('Tanzania', 'Africa', 'Eastern Africa', 883749, '1961-01-01', 57310019, 52.3, NULL, NULL, NULL, 'Republic', NULL, 'Dodoma')",
];
for (let i = 0; i < insert_country.length; i++) {
  sendQuery(insert_country[i]);
}

//Create a table called 'city'.
var create_city =
  'create table city (ID int, Name varchar(50), Country_Code int, District varchar(50), Population int)';

var insert_city = [
  "INSERT INTO city VALUES (1, 'Amsterdam', 31, NULL, 821752)",
  "INSERT INTO city VALUES (2, 'Rotterdam', 31, NULL, 623652)",
  "INSERT INTO city VALUES (3, 'Kabul', 93, NULL, 4600000)",
  "INSERT INTO city VALUES (4, 'Bucharest', 40, NULL, 1836000)",
  "INSERT INTO city VALUES (5, 'Stockholm', 46, NULL, 965232)",
  "INSERT INTO city VALUES (6, 'Damascus', 963, NULL, 1711000)",
  "INSERT INTO city VALUES (7, 'Dodoma', 255, NULL, 2084000)",
  "INSERT INTO city VALUES (8, 'Bern', 41, NULL, 133115)",
];

sendQuery(create_city);
for (let i = 0; i < insert_country.length; i++) {
  sendQuery(insert_city[i]);
}
//Write queries (that's a technical term meaning 'requests for information from a database') that will retrieve data that answers the following questions
//Write queries for: What are the names of the countries with population greater than 8 million
var select_by_population = 'SELECT name FROM country WHERE population > 8000000';
sendQuery(select_by_population);

//Write queries for: What are the names of the countries that have “land” in their names ?
var select_by_land = "SELECT name FROM country WHERE name LIKE '%land%'";
sendQuery(select_by_land);

//Write queries for: What are the names of the cities with population in between 500,000 and 1 million ?
var select_query = 'SELECT * FROM city WHERE Population BETWEEN 500000 AND 1000000';
sendQuery(select_query);

//Write queries for: What are the names of all the countries on the continent ‘Europe’ ?
var select_by_continent = "SELECT name FROM country WHERE continent = 'Europe'";
sendQuery(select_by_continent);

//Write queries for: List all the countries in the descending order based on their surface areas.
var select_by_surfaceArea =
  'SELECT name AS Country_Name, Surface_Area FROM country ORDER BY surface_Area DESC';
sendQuery(select_by_surfaceArea);

//Bonus Write queries that answer the following questions:

//What are the names of all the cities in the Netherlands?
const NETHERLANDS_CODE = 31;
var select_by_citiesOfNetherlands = `SELECT name AS City_Name FROM city WHERE Country_Code = ${NETHERLANDS_CODE}`;
sendQuery(select_by_citiesOfNetherlands);

//What's the population of Rotterdam?
var select_by_populationOfRotterdam = "SELECT Population FROM city WHERE name = 'Rotterdam'";
sendQuery(select_by_populationOfRotterdam);

//What's the top 10 countries based on surface area?
var select_by_top10Countries = 'SELECT * FROM country ORDER BY surface_Area DESC LIMIT 10';
sendQuery(select_by_top10Countries);

//What's the top 10 cities with the highest population?
var select_by_highestPopulation = 'SELECT * FROM city ORDER BY Population DESC LIMIT 10';
sendQuery(select_by_highestPopulation);

//What's the population of the world ?
var select_by_populationOfWorld = 'SELECT SUM(population) FROM country';
sendQuery(select_by_populationOfWorld);

connection.end();
