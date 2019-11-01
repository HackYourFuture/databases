'use strict';

const fs = require('fs');
const mysql = require('mysql');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
});

const executeQuery = promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS world`;
  const USE_DATABASE = `USE world`;

  const CREATE_CITIES_TABLE = `
  CREATE TABLE IF NOT EXISTS cities (
    id INT NOT NULL AUTO_INCREMENT, 
    city_name VARCHAR(254), 
    population INT, 
    district VARCHAR(254), 
    country_code VARCHAR(3), 
    primary key(id)
    );`;
  const CREATE_COUNTRIES_TABLE = `
  CREATE TABLE IF NOT EXISTS countries (
    id INT NOT NULL AUTO_INCREMENT,
    country_name VARCHAR(254),
    capital VARCHAR(254),
    local_name VARCHAR(254),
    indep_year INT,
    government_form VARCHAR(254),
    population INT,
    head_of_state VARCHAR(254),
    region VARCHAR(254),
    continent ENUM('Africa', 'Antarctica', 'Asia', 'Australia','Oceania', 'Europe', 'North America', 'South America' ),
    surface_area FLOAT,
    life_expectancy FLOAT,
    GNP FLOAT,
    GNP_old FLOAT,
    primary key(id)
    );`;

  connection.connect(err => {
    if (err) {
      console.log('Error while connecting to server');
    } else {
      console.log('Successfully connected to server');
    }
    process.exit;
  });

  try {
    await executeQuery(CREATE_DATABASE);
    await executeQuery(USE_DATABASE);
    await executeQuery(CREATE_CITIES_TABLE);
    await executeQuery(CREATE_COUNTRIES_TABLE);
    const { cities, countries } = JSON.parse(await readFile('./data.json', 'utf8'));
    cities.forEach(async city => {
      try {
        await executeQuery(`REPLACE INTO cities SET city_name='${city.name}', population=${city.population},
        district='${city.district}', country_code='${city.country_code}'`);
      } catch (error) {
        console.log(error);
      }
    });
    countries.forEach(async country => {
      try {
        await executeQuery(`INSERT INTO countries SET
          country_name="${country.name}",
          continent='${country.continent}',
          region='${country.region}',
          surface_area=${country.surface_area},
          indep_year=${country.indep_year},
          population=${country.population},
          life_expectancy=${country.life_expectancy},
          GNP=${country.gnp},
          GNP_old=${country.gnp_old},
          local_name='${country.local_name}',
          government_form= "${country.government_form}",
          head_of_state="${country.head_of_state}",
          capital=${country.capital}`);
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.error(error);
  }

  // Question 4 & 5

  try {
    await executeQuery(`SELECT country_name FROM countries WHERE population > 8000000`);

    await executeQuery(`SELECT country_name FROM countries WHERE country_name LIKE "%land%"`);

    await executeQuery(`SELECT city_name FROM cities WHERE population BETWEEN 500000 AND  1000000`);

    await executeQuery(`SELECT country_name FROM countries WHERE continent = "Europe"`);

    await executeQuery(`SELECT * FROM countries ORDER BY surface_area DESC`);

    await executeQuery(`SELECT city_name FROM cities WHERE country_code = 'NLD'`);

    await executeQuery(`SELECT population FROM cities WHERE city_name = 'Rotterdam'`);

    await executeQuery(`SELECT * FROM countries ORDER BY surface_area DESC LIMIT 10`);

    await executeQuery(`SELECT * FROM cities order by population DESC LIMIT 10`);

    await executeQuery(`SELECT SUM(population) AS population_of_The_World FROM countries`);
  } catch (error) {
    console.error(error);
  }

  connection.end(console.log('connection has ended'));
}
seedDatabase();
