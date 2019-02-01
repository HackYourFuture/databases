const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS my_world;`;
  const USE_DATABASE = `use my_world`;
  const CREATE_COUNTRY_TABLE = `
  CREATE TABLE IF NOT EXISTS countries ( 
    country_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    country_name VARCHAR(70) UNIQUE, 
    population INT, 
    continent VARCHAR(70), 
    surface INT 
  );`;

  const CREATE_CITY_TABLE = `
  CREATE TABLE IF NOT EXISTS cities(
    city_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(70) UNIQUE, 
    population int, 
    country_id int, 
    Foreign Key (country_id) REFERENCES countries (country_id)
    );`;

  const countries = [
    {
      country_name: 'Venezuela',
      population: 32000000,
      continent: 'South America',
      surface: 916445,
    },
    {
      country_name: 'Netherlands',
      population: 18000000,
      continent: 'Europe',
      surface: 42508,
    },
    {
      country_name: 'Germany',
      population: 83000000,
      continent: 'Europe',
      surface: 357386,
    },
    {
      country_name: 'Spain',
      population: 47000000,
      continent: 'Europe',
      surface: 505990,
    },
    {
      country_name: 'Colombia',
      population: 50000000,
      continent: 'South America',
      surface: 1142000,
    },
    {
      country_name: 'Italy',
      population: 61000000,
      continent: 'Europe',
      surface: 301338,
    },
    {
      country_name: 'China',
      population: 1386000000,
      continent: 'Asia',
      surface: 9600000,
    },
    {
      country_name: 'Japan',
      population: 127000000,
      continent: 'Asia',
      surface: 377972,
    },
    {
      country_name: 'Peru',
      population: 33000000,
      continent: 'South America',
      surface: 1285000,
    },
    {
      country_name: 'Canada',
      population: 37000000,
      continent: 'America',
      surface: 9985000,
    },
  ];

  const cities = [
    {
      city_name: 'Caracas',
      population: 1900000,
      country_id: 1,
    },
    {
      city_name: 'Amsterdam',
      population: 821752,
      country_id: 2,
    },
    {
      city_name: 'Berlin',
      population: 3575000,
      country_id: 3,
    },
    {
      city_name: 'Barcelona',
      population: 1609000,
      country_id: 4,
    },
    {
      city_name: 'Medellin',
      population: 2508000,
      country_id: 5,
    },
    {
      city_name: 'Rome',
      population: 2873000,
      country_id: 6,
    },
    {
      city_name: 'Beijing',
      population: 22000000,
      country_id: 7,
    },
    {
      city_name: 'Tokyo',
      population: 9273000,
      country_id: 8,
    },
    {
      city_name: 'Lima',
      population: 10000000,
      country_id: 9,
    },
    {
      city_name: 'Ottawa',
      population: 934240,
      country_id: 10,
    },
    {
      city_name: 'Rotterdam',
      population: 623652,
      country_id: 2,
    },
    {
      city_name: 'Alkmaar',
      population: 107106,
      country_id: 2,
    },
    {
      city_name: 'Eindhoven',
      population: 223209,
      country_id: 2,
    },
  ];
  connection.connect();
  try {
    await execQuery(CREATE_DATABASE);
    await execQuery(USE_DATABASE);
    await execQuery(CREATE_COUNTRY_TABLE);
    await execQuery(CREATE_CITY_TABLE);
    countries.forEach(async country => {
      await execQuery('INSERT IGNORE countries SET ?', country);
    });

    cities.forEach(async city => {
      await execQuery('INSERT IGNORE cities SET ?', city);
    });
  } catch (error) {
    console.log(error);
  }
  connection.end();
}

seedDatabase();