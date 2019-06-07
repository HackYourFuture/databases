'use strict';

const util = require('util');
const mysql = require('mysql');
const { countries, cities } = require('./data');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const DROP_WORLD_DATABASE = `DROP DATABASE IF EXISTS world;`;
  const CREATE_WORLD_DATABASE = `CREATE DATABASE IF NOT EXISTS world;`;
  const SELECT_WORLD_DATABASE = `USE world;`;

  const CREATE_COUNTRY_TABLE = `
    CREATE TABLE IF NOT EXISTS country(
      CODE CHAR(3) NOT NULL DEFAULT '',
      Name VARCHAR(255) NOT NULL,
      Continent enum('Asia','Europe','North America','Africa','Oceania','Antarctica','South America') NOT NULL,
      SurfaceArea FLOAT(10,2) NOT NULL,
      Population INT NOT NULL,
      PRIMARY KEY (CODE)
    );
  `;

  const CREATE_CITY_TABLE = `
    CREATE TABLE IF NOT EXISTS city(
      ID INT NOT NULL AUTO_INCREMENT,
      Name VARCHAR(255) NOT NULL,
      CountryCode CHAR(3) NOT NULL,
      District VARCHAR(255) NOT NULL, 
      Population INT NOT NULL,
      PRIMARY KEY (ID),
      FOREIGN KEY(CountryCode) REFERENCES country(code)
    );
  `;

  connection.connect(error => {
    if (error) throw error;
    console.log('\nMysql connected...\n');
  });

  try {
    // Drop the database
    await execQuery(DROP_WORLD_DATABASE);

    // Create the database world
    await execQuery(CREATE_WORLD_DATABASE);
    console.log('Database World created...');

    // Select the data base world
    await execQuery(SELECT_WORLD_DATABASE);
    console.log('Database World selected...');

    // Create the country table
    await execQuery(CREATE_COUNTRY_TABLE);
    console.log('Table country created...');

    // Create the city table
    await execQuery(CREATE_CITY_TABLE);
    console.log('Table city created...');

    // Execute the insert queries of the city table
    countries.forEach(async country => {
      await execQuery(country);
    });
    console.log('Data inserted in table country...');

    // Execute the insert queries of the city table
    cities.forEach(async city => {
      await execQuery(city);
    });
    console.log('Data inserted in table city...');
  } catch (error) {
    console.error(error);
  }

  connection.end(error => {
    if (error) throw error;
    console.log('\nMysql disconnected...');
  });
}

seedDatabase();
