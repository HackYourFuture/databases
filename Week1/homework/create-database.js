const util = require('util');
const mysql = require('mysql');
const countries = require('./countries.js');
const cities = require('./cities.js');

const connection = mysql.createConnection({
  multipleStatements: true,
  host: 'localhost',
  user: 'hyfuser',
  password: '7566',
  database: 'userdb'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_DATABASE_AND_LOGIN = `
    CREATE DATABASE IF NOT EXISTS world; USE world`;

  const CREATE_COUNTRY_TABLE = `
    CREATE TABLE IF NOT EXISTS country (
      Name TEXT,
      Population INT,
      Surface_Area_km2 INT,
      Continent TEXT
    );`;

  const CREATE_CITY_TABLE = `
    CREATE TABLE IF NOT EXISTS city (
      Name TEXT,
      Population INT
    );`;

  connection.connect();

  try {
    await execQuery(CREATE_DATABASE_AND_LOGIN);
    await execQuery(CREATE_COUNTRY_TABLE);
    await execQuery(CREATE_CITY_TABLE);
    countries.countries.forEach(async country => {
      await execQuery('INSERT INTO country SET ?', country);
    });
    cities.cities.forEach(async city => {
      await execQuery('INSERT INTO city SET ?', city);
    });
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
