const util = require('util');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const readFile = util.promisify(fs.readFile);
const execQuery = util.promisify(connection.query.bind(connection));

const CREATE_CITIES_TABLE = `
  CREATE TABLE IF NOT EXISTS cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    country_code CHAR(3),
    district VARCHAR(50),
    population INT
  );`;

const CREATE_COUNTRIES_TABLE = `
  CREATE TABLE IF NOT EXISTS countries (
    code CHAR(3) PRIMARY KEY,
    name VARCHAR(50),
    continent VARCHAR(50),
    region VARCHAR(50),
    surface_area INT,
    indep_year INT,
    population INT,
    life_expectancy FLOAT,
    gnp INT,
    gnp_old INT,
    local_name VARCHAR(50),
    government_form VARCHAR(50),
    head_of_state VARCHAR(50),
    capital VARCHAR(50),
    code2 CHAR(2)
  );`;

const INSERT_COUNTRIES = `
  INSERT INTO countries (
    code,
    name,
    continent,
    region,
    surface_area,
    indep_year,
    population,
    life_expectancy,
    gnp,
    gnp_old,
    local_name,
    government_form,
    head_of_state,
    capital,
    code2
  ) VALUES ?`;

const INSERT_CITIES = `
  INSERT INTO cities (
    name,
    country_code,
    district,
    population
  ) VALUES ?`;

async function getCountries() {
  const json = await readFile(path.join(__dirname, 'countries.json'));
  const countries = JSON.parse(json);
  return countries.map(country => {
    const {
      code,
      name,
      continent,
      region,
      surface_area,
      indep_year,
      population,
      life_expectancy,
      gnp,
      gnp_old,
      local_name,
      government_form,
      head_of_state,
      capital,
      code2,
    } = country;
    return [
      code,
      name,
      continent,
      region,
      surface_area,
      indep_year,
      population,
      life_expectancy,
      gnp,
      gnp_old,
      local_name,
      government_form,
      head_of_state,
      capital,
      code2,
    ];
  });
}

async function getCities() {
  const json = await readFile(path.join(__dirname, 'cities.json'));
  const cities = JSON.parse(json);
  return cities.map(city => {
    const { name, country_code, district, population } = city;
    return [name, country_code, district, population];
  });
}

async function seedDatabase() {
  connection.connect();

  try {
    await execQuery(CREATE_CITIES_TABLE);
    await execQuery(CREATE_COUNTRIES_TABLE);

    let result = await execQuery('SELECT COUNT(*) AS num FROM countries');
    if (result[0].num === 0) {
      const countries = await getCountries();
      await execQuery(INSERT_COUNTRIES, [countries]);
      console.log('populated countries table');
    } else {
      console.log('countries table was already populated');
    }

    result = await execQuery('SELECT COUNT(*) AS num FROM cities');
    if (result[0].num === 0) {
      const cities = await getCities();
      await execQuery(INSERT_CITIES, [cities]);
      console.log('populated cities table');
    } else {
      console.log('cities table was already populated');
    }
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
