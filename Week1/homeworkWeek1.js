var mysql = require('mysql');
var connection = mysql.createConnection({
  multipleStatements: true,
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect();
const databaseWorld = 'CREATE DATABASE IF NOT EXISTS world';
const useDatabase = 'USE world';
const tableCountry = `CREATE TABLE IF NOT EXISTS country (
              code CHAR(3), 
              Name CHAR(52), 
              Continent CHAR (30),
              Region CHAR(26),
              SurfaceArea FLOAT(10,2),
              Indepyear SMALLINT(6),
              Population INT(11),
              LifeExpectancy FLOAT(3.1),
              GNP FLOAT(10.2),
              LocalName CHAR(45),
              GovermentForm CHAR(45),
              HeadOfState CHAR(60),
              Capital INT(11),
              Code2 CHAR(2),
              PRIMARY KEY(Code));`;
const tableCity = `CREATE TABLE IF NOT EXISTS city(
              ID INT(11) AUTO_INCREMENT,
              Name CHAR(35),
              CountryCode CHAR(3),
              District CHAR(20),
              Population INT(11),
              PRIMARY KEY (ID),
              KEY CountryCode (CountryCode))`;

const initialQueries = [databaseWorld, , useDatabase, tableCity, tableCountry];
for (var i in initialQueries) {
  console.log('Going to run ', initialQueries[i]);
  connection.query(initialQueries[i], function(error) {
    if (error) {
      throw error;
    }
    console.log('Database and tables are created !');
  });
}

const queries = [
  `SELECT country.name FROM country WHERE country.population > 8000000;`,
  `SELECT country.name FROM country WHERE country.name LIKE '%land%';`,
  `SELECT city.name FROM city WHERE city.population > 500000 AND city.population < 1000000;`,
  `SELECT country.name FROM country WHERE country.Continent = 'Europe';`,
  `SELECT country.name FROM country ORDER BY country.SurfaceArea DESC;`,
  `SELECT city.name FROM city WHERE city.CountryCode = 'NLD';`,
  `SELECT city.Population FROM city WHERE city.name = 'Rotterdam';`,
  `SELECT country.name FROM country ORDER BY country.surfacearea DESC LIMIT 10;`,
  `SELECT city.name FROM city ORDER BY city.population DESC LIMIT 10;`,
  `SELECT SUM(country.population) FROM country;`,
];
for (var i in queries) {
  console.log('Going to run ', queries[i]);
  connection.query(queries[i], function(error, results) {
    if (error) {
      throw error;
    }
    console.log('the reply is ', results);
  });
}

connection.end();
