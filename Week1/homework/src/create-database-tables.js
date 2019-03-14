'use-strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

connection.connect();

const createDatabaseAndTables = async () => {
  await connection.query('CREATE DATABASE IF NOT EXISTS world', function(error) {
    if (error) throw error.message;
    console.log('Database "world" is created successfully!');
  });

  await connection.query('USE world', function(error) {
    if (error) throw error.message;
    console.log('Database "world" is being used!');
  });

  const createCountriesTable = `
CREATE TABLE IF NOT EXISTS countries (
  No INT,
  name LONGTEXT,
  capital TEXT,
  region TEXT,
  subregion TEXT,
  population INT,
  area INT
  );`;
  await connection.query(createCountriesTable, function(error) {
    if (error) throw error.message;
    console.log('countires table is created successfully!');
  });

  const createCitiesTable = `
CREATE TABLE IF NOT EXISTS cities (
  No INT,
  name LONGTEXT,
  population INT,
  country TEXT
  );`;
  await connection.query(createCitiesTable, function(error) {
    if (error) throw error.message;
    console.log('cities table is created successfully!');
  });
  connection.end();
};

createDatabaseAndTables();
