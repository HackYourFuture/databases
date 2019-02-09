code const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser2',
  password: 'class18password',
  database: 'new_world2',
});

// Promisify the bind function of query function of connection object
// Pass connection object (because bind expects "this")
// Afterwards execQuery will work as a function that returns a promise but
// we don't have to call "then" over that promise
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_COUNTRIES_TABLE = `
    CREATE TABLE IF NOT EXISTS countries (
      id INT NOT NULL,
      country_name VARCHAR(50) ,
      population INT ,
      continent ENUM ('Asia','Africa','North America','South America','Australia','Europe','Antarctica'),
     surface_area INT,
     capital VARCHAR(100),
     PRIMARY KEY (id)
    );`;
  const CREATE_CITIES_TABLE = `
    CREATE TABLE IF NOT EXISTS cities (
     city_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     city_name VARCHAR(50),
     population INT,
     country VARCHAR(50),
     surface_area INT,
     country_id INT,
     language VARCHAR(100),
     FOREIGN KEY  (country_id) REFERENCES countries (id)
    );`;
  const countries = [
    {
      id: 1,
      country_name: 'Nederland',
      population: 17080000,
      continent: 'Europe',
      surface_area: 42508,
      capital: 'Amsterdam',
    },
    {
      id: 2,
      country_name: 'Iraq',
      population: 37202572,
      continent: 'Asia',
      surface_area: 437072,
      capital: 'Baghdad',
    },
    {
      id: 3,
      country_name: 'Germany',
      population: 82790000,
      continent: 'Europe',
      surface_area: 357386,
      capital: 'Berlin',
    },
    {
      id: 4,
      country_name: 'United State',
      population: 327167434,
      continent: 'North America',
      surface_area: 327167434,
      capital: 'Washington',
    },
    {
      id: 5,
      country_name: 'Switzerland',
      population: 8508898,
      continent: 'Europe',
      surface_area: 41285,
      capital: 'None',
    },
    {
      id: 6,
      country_name: 'Greenland',
      population: 55877,
      continent: 'North America',
      surface_area: 2166086,
      capital: 'Nuuk',
    },
    {
      id: 7,
      country_name: 'Russia',
      population: 146793744,
      continent: 'Europe',
      surface_area: 17125191,
      capital: 'Moscow',
    },
    {
      id: 8,
      country_name: 'China',
      population: 1403500365,
      continent: 'Asia',
      surface_area: 9596961,
      capital: 'Beijing',
    },
    {
      id: 9,
      country_name: 'Egypt',
      population: 94798827,
      continent: 'Africa',
      surface_area: 1010408,
      capital: 'Cairo',
    },
    {
      id: 10,
      country_name: 'France',
      population: 67120000,
      continent: 'Europe',
      surface_area: 643801,
      capital: 'Paris',
    },
  ];

  ///

  const cities = [
    {
      city_name: 'Amsterdam',
      population: 859732,
      country: 'Nederland',
      surface_area: 219,
      country_id: 1,
      language: 'DUTCH',
    },
    {
      city_name: 'Paris',
      population: 2140526,
      country: 'France',
      surface_area: 105,
      country_id: 10,
      language: 'FRENCH',
    },
    {
      city_name: 'Cairo',
      population: 19500000,
      country: 'Egypt',
      surface_area: 606,
      country_id: 9,
      language: 'ARABIC',
    },
    {
      city_name: 'Berlin',
      population: 3575000,
      country: 'Germany',
      surface_area: 891,
      country_id: 3,
      language: 'GERMAN',
    },
    {
      city_name: 'Rotterdam',
      population: 623652,
      country: 'Nederland',
      surface_area: 320,
      country_id: 1,
      language: 'DUTCH',
    },
    {
      city_name: 'Minnesota',
      population: 5570000,
      country: 'United State',
      surface_area: 225163,
      country_id: 4,
      language: 'ENGLISH',
    },
    {
      city_name: 'Den Haag',
      population: 527748,
      country: 'Nederland',
      surface_area: 98,
      country_id: 1,
      language: 'DUTCH',
    },
    {
      city_name: 'Moscow',
      population: 11503501,
      country: 'Russia',
      surface_area: 2511,
      country_id: 7,
      language: 'RUSSIAN',
    },
    {
      city_name: 'Beijing',
      population: 19612368,
      country: 'China',
      surface_area: 16808,
      country_id: 8,
      language: 'MANDARIN',
    },
    {
      city_name: 'Baghdad',
      population: 8765000,
      country: 'Iraq',
      surface_area: 204,
      country_id: 2,
      language: 'ARABIC',
    },
  ];
  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(CREATE_COUNTRIES_TABLE);
    countries.forEach(async country => {
      await execQuery('INSERT INTO countries SET ?', country);
    });
    await execQuery(CREATE_CITIES_TABLE);
    cities.forEach(async city => {
      await execQuery('INSERT INTO cities SET ?', city);
    });
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
