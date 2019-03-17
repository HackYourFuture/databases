const util = require('util');
const mysql = require('mysql');
const connection = require('./connection');

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS World`;
  const USE_DATABASE = `USE World`;
  const CREATE_COUNTRIES_TABLE = `
    CREATE TABLE IF NOT EXISTS countries (
      country_code INT NOT NULL,
      country_name VARCHAR(50) NOT NULL,
      country_continent VARCHAR(50) NOT NULL,
      country_population FLOAT NOT NULL,
      surface_areas FLOAT NOT NULL
    );`;
  const CREATE_CITIES_TABLE = `
    CREATE TABLE IF NOT EXISTS cities (
      city_name VARCHAR(20) NOT NULL,
      city_population FLOAT NOT NULL,
      city_code VARCHAR(3) NOT NULL
    
    );`;
  const countries = [
    {
      country_code: '61',
      country_name: 'Australia',
      country_continent: 'Oceania & Australia',
      country_population: '25,088,636',
      surface_areas: '7,682,300',
    },
    {
      country_code: '86',
      country_name: 'China',
      country_continent: 'Asia',
      country_population: '1,420,062,022	',
      surface_areas: '9,388,211',
    },
    {
      country_code: '358',
      country_name: 'Finland',
      country_continent: 'Europe',
      country_population: '5,561,389',
      surface_areas: '303,890',
    },
    {
      country_code: '33',
      country_name: 'France',
      country_continent: 'Europe',
      country_population: '65,480,710',
      surface_areas: '547,557',
    },
    {
      country_code: '49',
      country_name: 'Germany',
      country_continent: 'Europe',
      country_population: '82,438,639',
      surface_areas: '348,560	',
    },
    {
      country_code: '354',
      country_name: 'Iceland',
      country_continent: 'Europe',
      country_population: '340,566	',
      surface_areas: '100,250	',
    },
    {
      country_code: '91',
      country_name: 'India',
      country_continent: 'Asia',
      country_population: '1,368,737,513',
      surface_areas: '2,973,190',
    },
    {
      country_code: '507',
      country_name: 'Panama',
      country_continent: 'North America',
      country_population: '4,226,197',
      surface_areas: '74,340',
    },
    {
      country_code: '963',
      country_name: 'Syria',
      country_continent: 'Asia',
      country_population: '18,499,181',
      surface_areas: '183,630',
    },
  ];
  const cities = [
    {
      city_name: 'Amsterdam',
      city_population: '821.752',
    },
    {
      city_name: 'Rotterdam',
      city_population: '623.652',
    },
    {
      city_name: 'The Hague',
      city_population: '514.861',
    },
    {
      city_name: 'Utrecht',
      city_population: '334.176',
    },
    {
      city_name: 'Eindhoven',
      city_population: '223.209',
    },
    {
      city_name: 'Tilburg',
      city_population: '211.648',
    },
    {
      city_name: 'Groningen',
      city_population: '200.336',
    },
    {
      city_name: 'Almere',
      city_population: '196.932',
    },
    {
      city_name: 'Breda',
      city_population: '180.937',
    },
    {
      city_name: 'Nijmegen',
      city_population: '170.681',
    },
  ];

  connection.connect();

  try {
    await execQuery(CREATE_DATABASE);
    await execQuery(USE_DATABASE);
    await execQuery(CREATE_COUNTRIES_TABLE);
    await execQuery(CREATE_CITIES_TABLE);
    countries.forEach(async country => {
      await execQuery('INSERT INTO countries SET ?', country);
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
