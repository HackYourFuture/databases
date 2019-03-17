const util = require('util');
const mysql = require('mysql');

const countries = require('./countries');
const cities = require('./cities');

const queries = require('./queries');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyf_Pass1',
  database: 'world',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_COUNTRY_TABLE = `
    CREATE TABLE IF NOT EXISTS country (
    country_id int(11),
    name varchar(50),
    population int(11)
    continent varchar(50),
    surface float 
    )`;

  const CREATE_CITY_TABLE = `
    CREATE TABLE IF NOT EXISTS city (
    city_id int(11),
    name varchar(50),
    population int(11),
    country varchar(50),
    surface float
    )`;
}

connection.connect();

try {
  await execQuery(CREATE_COUNTRY_TABLE);
  await execQuery(CREATE_CITY_TABLE);
  countries.forEach(async country => {
    await execQuery('INSERT INTO country SET ?', country);
  });
  cities.forEach(async city => {
    await execQuery('INSERT INTO city SET ?', city);
  });

  await execQuery(queries.greaterThan8Million);
  await execQuery(queries.namesHaveLand);
  await execQuery(queries.populationBetween);
  await execQuery(queries.europeCountries);
  await execQuery(queries.surfaces);
  await execQuery(queries.citiesOfNetherlands);
  await execQuery(queries.populationOfNetherlands);
  await execQuery(queries.topTenBySurface);
  await execQuery(queries.topTenByPopulation);
  await execQuery(queries.worldPopulation);
} catch (error) {
  console.log(error);
}

connection.end();

seedDatabase();
