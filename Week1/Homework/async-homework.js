const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS new_world;`;
  const USE_DATABASE = `use new_world`;
  const CREATE_COUNTRY_TABLE = `
  CREATE TABLE IF NOT EXISTS countries (
    ID int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    country_name VARCHAR(100) NOT NULL, 
    population int, 
    continent VARCHAR(100), 
    surface float,
  );`;

  const CREATE_CITY_TABLE = `
  CREATE TABLE IF NOT EXISTS cities(
    CITY_ID int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    city_name VARCHAR(100) NOT NULL, 
    population int, 
    ID int, 
    Foreign Key (ID) REFERENCES countries (ID)
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
  ];

  connection.connect();
  try {
    await execQuery(CREATE_DATABASE);
    await execQuery(USE_DATABASE);
    await execQuery(CREATE_COUNTRY_TABLE);
    await execQuery(CREATE_CITY_TABLE);
    countries.forEach(async country => {
      await execQuery('INSERT IGNORE INTO countries SET ?', country);
    });
    await execQuery('select country_name from countries where population >= 8000000'); // 3
    await execQuery("select * from countries where country_name like '%land%'"); //2
    await execQuery("select country_name from countries where continent = 'Europe'"); //4
    await execQuery('select country_name from countries ORDER BY surface DESC'); //5
    cities.forEach(async city => {
      await execQuery('INSERT IGNORE INTO cities SET ?', city);
    });
    await execQuery(
      'select city_name from cities where population >= 500000 and population <= 1000000',
    ); // 1
  } catch (error) {
    console.log(error);
  }
  connection.end();
}

seedDatabase();
