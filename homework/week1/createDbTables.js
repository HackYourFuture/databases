/* eslint-disable no-console */
const util = require('util');
const mysql = require('mysql');
const { config } = require('./connection.js');

const connection = mysql.createConnection(config);

const execQuery = util.promisify(connection.query.bind(connection));

async function createDatabaseAndTables() {
  const CREATE_WORLD_DB = 'CREATE DATABASE IF NOT EXISTS world;';
  const USE_DB = 'USE world;';

  const CREATE_COUNTRIES = `CREATE TABLE IF NOT EXISTS countries (
    country_code VARCHAR(2) NOT NULL PRIMARY KEY,
    country_name VARCHAR(90) NOT NULL,
    continent VARCHAR(15) NOT NULL,
    capital VARCHAR(255),
    population INT,
    surface_area INT );`;

  const CREATE_CITIES = `CREATE TABLE IF NOT EXISTS cities (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(50) NOT NULL,
    country_code VARCHAR(2),
    population INT,
    FOREIGN KEY fk_country_code(country_code)
    REFERENCES countries(country_code)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
  );`;

  connection.connect();

  try {
    await execQuery(CREATE_WORLD_DB);
    await execQuery(USE_DB);
    await execQuery(CREATE_COUNTRIES);
    await execQuery(CREATE_CITIES);
    console.log('World database and tables are created successfully');
  } catch (error) {
    console.error(error.message);
  }

  connection.end();
}

module.exports = createDatabaseAndTables;
