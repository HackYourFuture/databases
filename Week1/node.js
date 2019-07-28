'use strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect();

const queriesForCreation = [
  'CREATE DATABASE world',
  'USE world',
  'CREATE TABLE countries (name VARCHAR(50), continent VARCHAR(50), region VARCHAR(50), surface_area INT, indep_year DATE, population INT, life_expectancy FLOAT, gnp FLOAT, gnp_old FLOAT, local_name VARCHAR(50), government_form VARCHAR(50), head_of_state VARCHAR(50), capital VARCHAR(50))',
  'CREATE TABLE cities (id INT, name VARCHAR(50), country_code INT, district VARCHAR(50), population INT)',
];

const dataForSomeCountriesAndCities = [
  "INSERT INTO countries VALUES ('Netherlands', 'Europe', 'Western Europe', 800, '1581-01-01', 17035938, 78.3, NULL, NULL, NULL, 'Constitutional Monarchy', NULL, 'Amsterdam')",
  "INSERT INTO countries VALUES ('Afghanistan', 'Asia', 'Southern and Central Asia', 652090, '1919-01-01', 35530081, 45.9, NULL, NULL, NULL, 'Islamic Emirate', NULL, 'Kabul')",
  "INSERT INTO countries VALUES ('Romania', 'Europe', 'Eastern Europe', 238391, '1878-01-01', 19679306, 69.9, NULL, NULL, NULL, 'Republic', NULL, 'Bucharest')",
  "INSERT INTO countries VALUES ('Switzerland', 'Europe', 'Western Europe', 41284, '1499-01-01', 8476005, 79.6, NULL, NULL, NULL, 'Federation', NULL, 'Bern')",
  "INSERT INTO countries VALUES ('Sweden', 'Europe', 'Nordic Countries', 449964, '836-01-01', 9910701, 79.6, NULL, NULL, NULL, 'Constitutional Monarchy', NULL, 'Stockholm')",
  "INSERT INTO countries VALUES ('Syria', 'Asia', 'Middle East', 185180, '1941-01-01', 18269868, 68.5, NULL, NULL, NULL, 'Republic', NULL, 'Damascus')",
  "INSERT INTO countries VALUES ('Tanzania', 'Africa', 'Eastern Africa', 883749, '1961-01-01', 57310019, 52.3, NULL, NULL, NULL, 'Republic', NULL, 'Dodoma')",
  "INSERT INTO cities VALUES (1, 'Amsterdam', 31, NULL, 821752)",
  "INSERT INTO cities VALUES (2, 'Rotterdam', 31, NULL, 623652)",
  "INSERT INTO cities VALUES (3, 'Kabul', 93, NULL, 4600000)",
  "INSERT INTO cities VALUES (4, 'Bucharest', 40, NULL, 1836000)",
  "INSERT INTO cities VALUES (5, 'Stockholm', 46, NULL, 965232)",
  "INSERT INTO cities VALUES (6, 'Damascus', 963, NULL, 1711000)",
  "INSERT INTO cities VALUES (7, 'Dodoma', 255, NULL, 2084000)",
  "INSERT INTO cities VALUES (8, 'Bern', 41, NULL, 133115)",
];

// 1. What are the names of the countries with population greater than 8 million
// 2. What are the names of the countries that have “land” in their names ?
// 3. What are the names of the cities with population in between 500,000 and 1 million ?
// 4. What are the names of all the countries on the continent ‘Europe’ ?
// 5. List all the countries in the descending order based on their surface areas.

const queriesForSearch = [
  "SELECT name AS 'More Than 8 Million Population' FROM countries WHERE population > 8000000",
  "SELECT name FROM countries WHERE name LIKE '%land%'",
  "SELECT name AS 'Population Between 500,000 and 1 million' FROM countries WHERE population < 1000000 AND population > 500000",
  "SELECT name AS 'Countries in Europe' FROM countries WHERE continent = 'Europe'",
  'SELECT * FROM countries ORDER BY surface_area DESC',
];

// 6. What are the names of all the cities in the Netherlands?
// 7. What's the population of Rotterdam?
// 8. What's the top 10 countries based on surface area?
// 9. What's the top 10 cities with the highest population?
// 10. What's the population of the world ?

const optionalQueriesForSearch = [
  "SELECT name AS 'Cities in The Netherlands' FROM cities WHERE country_code = 31",
  "SELECT population AS 'Population of Rotterdam' FROM cities WHERE name = 'Rotterdam'",
  'SELECT * FROM countries ORDER BY surface_area DESC LIMIT 10',
  'SELECT * FROM cities ORDER BY population DESC LIMIT 10',
  "SELECT SUM(population) AS 'Population Of The World' FROM countries",
];

function executeCreatorQueries(arrayOfQueries) {
  arrayOfQueries.forEach(query => {
    connection.query(query, (error, results, fields) => {
      if (error) throw error;
      console.log(
        `The reply for query: ${query} =>\nQuery OK, ${results.affectedRows} rows affected.\n\n`,
      );
    });
  });
}

function executeRetrievalQueries(arrayOfQueries) {
  arrayOfQueries.forEach(query => {
    connection.query(query, (error, results, fields) => {
      if (error) throw error;
      console.log(`The reply for query: ${query} =>\n${JSON.stringify(results, null, 2)}\n\n`);
    });
  });
}

executeCreatorQueries(queriesForCreation);
executeCreatorQueries(dataForSomeCountriesAndCities);
executeRetrievalQueries(queriesForSearch);
executeRetrievalQueries(optionalQueriesForSearch);

connection.end();
