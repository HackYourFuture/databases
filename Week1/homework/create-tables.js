'use strict';
const mysql = require('mysql');
const util = require('util');
const fs = require('fs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser2',
  password: 'hyfpassword',
  database: 'world',
});

const executeQuery = util.promisify(connection.query.bind(connection));

const countries = JSON.parse(fs.readFileSync('./countries.json', 'utf8'));
const cities = JSON.parse(fs.readFileSync('./cities.json', 'utf8'));

async function createTables() {
  const CREATE_COUNTRY_TABLE = `
    CREATE TABLE IF NOT EXISTS countries (
      country_id INT,
      country_name VARCHAR(50),
      population INT,
      continent_name VARCHAR(50),
      surface_area FLOAT,
      PRIMARY KEY(country_id)      
      );`;
  const CREATE_CITY_TABLE = `
    CREATE TABLE IF NOT EXISTS cities (
      city_id INT,
      city_name VARCHAR(50),
      country_name VARCHAR(50),      
      population INT,     
      PRIMARY KEY(city_id) 
      );`;
  connection.connect();

  try {
    await executeQuery('DROP TABLE IF EXISTS countries');
    await executeQuery('DROP TABLE IF EXISTS cities');
    await executeQuery(CREATE_COUNTRY_TABLE);
    await executeQuery(CREATE_CITY_TABLE);
    countries.forEach(async country => {
      await executeQuery('INSERT INTO countries SET ?', country);
    });
    cities.forEach(async city => {
      await executeQuery('INSERT INTO cities SET ?', city);
    });
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

module.exports = createTables;
