const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect();

// creates the 'world' database
const createDatabase = `CREATE DATABASE IF NOT EXISTS world`;
connection.query(createDatabase, error => {
  if (error) throw error;
  console.log('Database has been created');
});

// uses the database created
connection.query(`USE world`, error => {
  if (error) throw error;
  console.log('Database has been used');
});

// creates the 'Country Table'
const createCountryTable = `CREATE TABLE IF NOT EXISTS country(
  ID INT(11) AUTO_INCREMENT,
  Code VARCHAR(3),
  Name VARCHAR(52),
  Population INT(11),
  Continent  VARCHAR(20),
  SurfaceArea FLOAT(10, 2),
  IndepYear SMALLINT(6),
  PRIMARY KEY (ID))`;

connection.query(createCountryTable, error => {
  if (error) throw error;
  console.log('Country table has been created');
});

// creates the 'City Table'
const createCityTable = `CREATE TABLE IF NOT EXISTS city(
  ID INT(11) AUTO_INCREMENT, 
  Name VARCHAR(35), 
  CountryCode VARCHAR(3), 
  District VARCHAR(20),
  Population INT(11),
  PRIMARY KEY (ID))`;

connection.query(createCityTable, error => {
  if (error) throw error;
  console.log('City table has been created');
});

// 1. Query
connection.query(`SELECT name FROM country WHERE Population > 8000000;`, (error, result) => {
  if (error) throw error;
  console.log(result);
});

//2. Query
connection.query(`SELECT name FROM country WHERE Name LIKE '%land%';`, (error, result) => {
  if (error) throw error;
  console.log(result);
});

//3. Query
connection.query(`SELECT name FROM city WHERE Population BETWEEN 500000 AND 1000000;`, (error, result) => {
  if (error) throw error;
  console.log(result);
});

//4. Query
connection.query(`SELECT name FROM country WHERE Continent = 'Europe';`, (error, result) => {
  if (error) throw error;
  console.log(result);
});

//5. Query
connection.query(`SELECT name FROM country ORDER BY SurfaceArea DESC;`, (error, result) => {
  if (error) throw error;
  console.log(result);
});

// 6. Query
connection.query(`SELECT name FROM city WHERE CountryCode = 'NLD';`, (error, result) => {
  if (error) throw error;
  console.log(result);
});

//7. Query
connection.query(`SELECT Population FROM city WHERE Name = 'Rotterdam';`, (error, result) => {
  if (error) throw error;
  console.log(result);
});

//8. Query
connection.query(`SELECT name FROM country ORDER BY SurfaceArea DESC LIMIT 10;`, (error, result) => {
  if (error) throw error;
  console.log(result);
});

//9. Query
connection.query(`SELECT name FROM city ORDER BY Population DESC LIMIT 10;`, (error, result) => {
  if (error) throw error;
  console.log(result);
});

//10. Query
connection.query(`SELECT SUM(Population) AS 'World Population' FROM country;`, (error, result) => {
  if (error) throw error;
  console.log(result);
});

connection.end();