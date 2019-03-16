const util = require('util');
const mysql = require('mysql');
const cities = require('nl-city');
const Country = require('db-country');
const countries = Country.findAll();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const DROP_COUNTRIES_TABLE = `DROP TABLE IF EXISTS countries`;
  const DROP_CITIES_TABLE = `DROP TABLE IF EXISTS cities`;
  const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS world`;
  const CREATE_COUNTRIES_TABLE = `
    CREATE TABLE IF NOT EXISTS countries (
      name_en VARCHAR(50),
      continent VARCHAR(30),
      population FlOAT,
      area FLOAT
    );`;
  const CREATE_CITIES_TABLE = `
    CREATE TABLE IF NOT EXISTS cities (
      city_name VARCHAR(50),
      country VARCHAR(50),
      population FLOAT
    );`;
  connection.connect();

  try {
    await execQuery(DROP_COUNTRIES_TABLE);
    await execQuery(DROP_CITIES_TABLE);
    await execQuery(CREATE_DATABASE);
    await execQuery(CREATE_COUNTRIES_TABLE);
    await execQuery(CREATE_CITIES_TABLE);
    countries.forEach(async country => {
      await execQuery('INSERT INTO countries SET name_en=?, continent=?, population=?, area=?', [
        country.name_en,
        country.continent,
        country.population,
        country.area,
      ]);
    });
    cities.forEach(async city => {
      await execQuery('INSERT INTO cities SET ?', city);
    });
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
