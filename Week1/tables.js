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
  const CREATE_COUNTRIES_TABLE = `
  CREATE TABLE IF NOT EXISTS countries (
  name VARCHAR(50),
  capital VARCHAR(50),
  population int,
  government VARCHAR(50),
  continent enum ('Asia','EU','N America','S America','Africa','AU','ANTARCTICA'),
  );`;
  const CREATE_CITIES_TABLE = `
	  CREATE TABLE IF NOT EXISTS cities(
      name VARCHAR(50),
      population int,
      is_capital boolean
      );`;
  const countries = [
    {
      name: 'the NL',
      capital: 'Amsterdam',
      population: 17000000,
      government: 'kingdom',
      continent: 'EU',
    },
    {
      name: 'France',
      capital: 'Paris',
      population: 67000000,
      government: 'republic',
      continent: 'EU',
    },
    {
      name: 'Germany',
      capital: 'Berlin',
      population: 83000000,
      government: 'Federal Republic',
      continent: 'EU',
    },
    {
      name: 'Japan',
      capital: 'Tokyo',
      population: 127000000,
      government: 'constitutional monarchy',
      continent: 'Asia',
    },
  ];
  const cities = [
    {
      name: 'Kyoto',
      population: 1480000,
      is_capital: false,
    },
    {
      name: 'Munich',
      population: 1450000,
      is_capital: false,
    },
    {
      name: 'Rotterdam',
      population: 623645,
      is_capital: false,
    },
    {
      name: 'Lyon',
      population: 500713,
      is_capital: false,
    },
  ];

  connection.connect();

  try {
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
  try {
    const results = await execQuery('select * from countries');
    console.log(results);
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
