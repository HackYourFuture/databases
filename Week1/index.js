'use-strict';

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

connection.connect();
const allDatabase = 'CREATE DATABASE IF NOT EXISTS world';
const useDatabase = 'USE world';
const countryTable = `CREATE TABLE IF NOT EXISTS country (
  Code CHAR(3) NOT NULL DEFAULT '',
  Name CHAR(52) NOT NULL DEFAULT '',
  Continent enum('Asia', 'Europe', 'North America', 'Africa', 'Oceania', 'Antarctica', 'South America') NOT NULL DEFAULT 'Asia',
  Region CHAR(26) NOT NULL DEFAULT '',
  SurfaceArea FLOAT(10, 2) NOT NULL DEFAULT '0.00',
  IndepYear SMALLINT(6) DEFAULT NULL,
  Population INT(11) NOT NULL DEFAULT '0',
  LifeExpectancy FLOAT(3, 1) DEFAULT NULL,
  GNP FLOAT(10, 2) DEFAULT NULL,
  GNPOld FLOAT(10, 2) DEFAULT NULL,
  LocalName CHAR(45) NOT NULL DEFAULT '',
  GovernmentForm CHAR(45) NOT NULL DEFAULT '',
  HeadOfState CHAR(60) DEFAULT NULL,
  Capital INT(11) DEFAULT NULL,
  Code2 CHAR(2) NOT NULL DEFAULT '',
  PRIMARY KEY(Code)
  );`;

const cityTable = `CREATE TABLE IF NOT EXISTS city(
  ID INT(11) NOT NULL AUTO_INCREMENT,
  Name CHAR(35) NOT NULL DEFAULT '',
  CountryCode CHAR(3) NOT NULL DEFAULT '',
  District CHAR(20) NOT NULL DEFAULT '',
  Population INT(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (ID),
  KEY CountryCode (CountryCode),
  CONSTRAINT city_ibfk_1 FOREIGN KEY (CountryCode) REFERENCES country (Code)
);`;

const creator = [allDatabase, useDatabase, countryTable, cityTable];
for (let i in creator) {
  console.log('Running ', creator[i]);
  connection.query(creator[i], function(error) {
    if (error) {
      throw error;
    }
    console.log('Database is uploaded and tables are ready. ');
  });
}

const queries = [
  `SELECT country.name, country.population FROM country WHERE country.population > 8000000;`,
  `SELECT country.name FROM country WHERE country.name LIKE '%land%';`,
  `SELECT city.name, city.population FROM city WHERE city.population > 500000 AND city.population < 1000000;`,
  `SELECT country.name FROM country WHERE country.Continent = 'Europe';`,
  `SELECT country.name, country.SurfaceArea FROM country ORDER BY country.SurfaceArea DESC;`,
  `SELECT city.name FROM city WHERE city.CountryCode = 'NLD';`,
  `SELECT city.Population FROM city WHERE city.name = 'Rotterdam';`,
  `SELECT country.name, country.SurfaceArea FROM country ORDER BY country.surfaceArea DESC LIMIT 10;`,
  `SELECT city.name, city.population FROM city ORDER BY city.population DESC LIMIT 10;`,
  `SELECT SUM(country.population) FROM country;`,
];

const requestedQueries = [
  'Names of the countries with population greater than 8 million: ',
  'Names of the countries that have "land" in their names: ',
  'Names of the cities with population in between 500,000 and 1 million: ',
  'Names of all the countries on the continent Europe: ',
  'List of all the countries in the descending order based on their surface areas: ',
  'Names of all the cities in the Netherlands: ',
  'The population of Rotterdam is: ',
  'The top 10 countries based on their surface area: ',
  'The top 10 cities with the highest population: ',
  'The population of the world is: ',
];

for (let i in queries) {
  console.log('Running ', queries[i]);
  connection.query(queries[i], function(error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('\n' + requestedQueries[i] + '\n', results);
  });
}

connection.end();
