const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  multipleStatements: true,
});

connection.connect();

const sqlCommand = `
  CREATE DATABASE new_world;

  USE new_world; 

  CREATE TABLE if not exists country(id INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(50), Continent VARCHAR(50), Region VARCHAR(50), SurfaceArea FLOAT, IndepYear INT, Population INT, LifeExpectancy FLOAT, GNP FLOAT(7,2), GNPOld FLOAT(7,2), LocalName VARCHAR(50), GovernmentForm VARCHAR(50), HeadOfState VARCHAR(50), Capital VARCHAR(30));

  CREATE TABLE if not exists city(id INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(50), CountryCode VARCHAR(10), District VARCHAR(30), Population INT);
`;

connection.query(sqlCommand, (err, result, fields) => {
  if (err) console.log(err.message);
});
console.log('Table is created');

connection.end();
