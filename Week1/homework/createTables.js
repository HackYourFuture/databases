const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'world',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_COUNTRIES_TABLE = `
    CREATE TABLE IF NOT EXISTS countries (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(50),
      capital VARCHAR(50),
      region VARCHAR(50),
      population INT,
      area INT
    );`;
  const CREATE_CITIES_TABLE = `
    CREATE TABLE IF NOT EXISTS cities (
      id INT PRIMARY KEY AUTO_INCREMENT,
      city_name VARCHAR(50),
      country VARCHAR(50),      
      population INT,
      country_id INT,
      FOREIGN KEY(country_id) REFERENCES countries(id)   
    );`;
  const countries = require('./data/countries.json');
  const cities = require('./data/cities.json');

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

  connection.end();
}

seedDatabase();
