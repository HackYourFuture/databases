const util = require('util');
const mysql = require('mysql');
const data = require('./data');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS world`;
  const CREATE_COUNTRIES_TABLE = `
    CREATE TABLE IF NOT EXISTS countries (
      country_number INT,
      country_name VARCHAR(50),
      continent VARCHAR(30),
      population FlOAT,
      surface_area FLOAT
    );`;
  const CREATE_CITIES_TABLE = `
    CREATE TABLE IF NOT EXISTS cities (
      city_number INT,
      city_name VARCHAR(50),
      population FLOAT
    );`;

  connection.connect();

  try {
    await execQuery(CREATE_DATABASE);
    await execQuery(CREATE_COUNTRIES_TABLE);
    await execQuery(CREATE_CITIES_TABLE);

    data.countries.forEach(async country => {
      await execQuery('INSERT INTO countries SET ?', country);
    });
    data.cities.forEach(async city => {
      await execQuery('INSERT INTO cities SET ?', city);
    });
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
