const mysql = require('mysql');
const database = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

database.connect();

// create database world

database.query(`CREATE DATABASE IF NOT EXISTS world`, (error, result) => {
  if (error) throw error;
  console.log('world database is created');
});

// use world database
database.query(`USE world`, (error, result) => {
  if (error) throw error;
  console.log('change to WORLD database');
});

//========== create tables : country , city , and insert data in it =================

const table_of_country =
  'CREATE TABLE IF NOT EXISTS country (name VARCHAR(50), continent VARCHAR(50), region VARCHAR(50), surface_area FLOAT, indep_year INT, population INT, life_expectancy, GNP FLOAT, GNPold FLOAT, local_name VARCHAR(50), government_form VARCHAR(50), head_of_state VARCHAR(50),capital VARCHAR(50))';

database.query(table_of_country, (error, result) => {
  if (error) throw error;
  // console.log(result);
  console.log('Country table is created');
});

var table_of_city =
  'CREATE TABLE IF NOT EXISTS city (id INT, name VARCHAR(50),country_code VARCHAR(10), district VARCHAR(50), population INT)';

database.query(table_of_city, (error, results) => {
  if (error) throw error;
  console.log('City table is created');
});

var insert_countries = [
  "INSERT INTO country (name, continent,surface_area, population) VALUES ('Angola','Africa',1246700,12878000)",
  "INSERT INTO country (name, continent,surface_area, population) VALUES ('Syria', 'Asia', 185180, 18269868)",
  "INSERT INTO country (name, continent,surface_area, population) VALUES ('Tanzania', 'Africa', 883749, 57310019)",
  "INSERT INTO country (name, continent,surface_area, population) VALUES ('Netherlands','Europe', 800, 17035938)",
  "INSERT INTO country (name, continent,surface_area, population) VALUES ('Afghanistan', 'Asia',  652090, 35530081)",
  "INSERT INTO country (name, continent,surface_area, population) VALUES ('Romania','Europe', 238391, 19679306)",
  "INSERT INTO country (name, continent,surface_area, population) VALUES ('Switzerland','Europe', 41284, 8476005)",
  "INSERT INTO country (name, continent,surface_area, population) VALUES ('Sweden', 'Europe', 449964, 9910701)",
];
for (let i in insert_countries) {
  database.query(insert_countries[i], error => {
    if (error) {
      throw error;
    }
    console.log([i] + 'success');
  });
}

var insert_cities = [
  "INSERT INTO city (id, name, country_code, population) VALUES (1, 'Amsterdam', 'NLD', 821752)",
  "INSERT INTO city (id, name, country_code, population) VALUES (2, 'Rotterdam','NLD', 623652)",
  "INSERT INTO city (id, name, country_code, population) VALUES (3, 'Kabul','KAB', 4600000)",
  "INSERT INTO city (id, name, country_code, population) VALUES (4, 'Bucharest','BUC', 1836000)",
  "INSERT INTO city (id, name, country_code, population) VALUES (5, 'Stockholm','STO',  965232)",
  "INSERT INTO city (id, name, country_code, population) VALUES (6, 'Damascus', 'DAM',1711000)",
  "INSERT INTO city (id, name, country_code, population) VALUES (7, 'Dodoma', 'DOD',2084000)",
  "INSERT INTO city (id, name, country_code, population) VALUES (8, 'Bern', 'BER', 133115)",
  "INSERT INTO city (id, name, country_code, population) VALUES (9,'Arnhem','NLD',138020)",
  "INSERT INTO city (id, name, country_code, population) VALUES (10,'Breda','NLD',160398)",
  "INSERT INTO city (id, name, country_code, population) VALUES (11,'Huambo','HUA',163100)",
  "INSERT INTO city (id, name, country_code, population) VALUES (12,'Lobito','LOB',130000)",
  "INSERT INTO city (id, name, country_code, population) VALUES (13,'Benguela','BEN',128300)",
  "INSERT INTO city (id, name, country_code, population) VALUES (14,'Zaanstad', 'ZAA',135621)",
];

for (let i in insert_cities) {
  // console.log('Going to run ', insert_cities[i]);
  database.query(insert_cities[i], error => {
    if (error) {
      throw error;
    }
    console.log([i] + 'success');
  });
}

// What are the names of the countries with population greater than 8 million
database.query(`SELECT * FROM country WHERE Population > 8000000`, (error, result) => {
  if (error) throw error;

  console.log(`\n Countries with population more than 8 million:`);
  result.forEach(country => {
    console.log(`${country.Name} , ${country.Population}`);
  });
});

// Names of the countries that have “land” in their names ?
database.query(`SELECT * FROM country WHERE Name LIKE '%land%' `, (error, result) => {
  if (error) throw error;
  console.log(`\n Countries that have “land” in their names:`);
  result.forEach(land => {
    console.log(land.Name);
  });
});

// Cities with population between 500,000 and 1 million ?
database.query(
  `SELECT * FROM city WHERE Population BETWEEN 500000 AND 1000000 `,
  (error, result) => {
    if (error) throw error;
    console.log(`\n Cities with population between 500,000 and 1 million is :`);
    result.forEach(city => {
      console.log(city.Name);
    });
  },
);

// Countries in the Europe continent ?

database.query(`SELECT * FROM country WHERE Continent = 'Europe' `, (error, result) => {
  if (error) throw error;

  console.log(`\n Countries in Europe continent:`);
  result.forEach(country => {
    console.log(country.Name);
  });
});

// Countries in descending order, based on their surface areas.

database.query(`SELECT * FROM country ORDER BY SurfaceArea DESC`, (error, result) => {
  if (error) throw error;

  console.log(`\n Countries in descending order based on their surface areas:`);
  result.forEach(country => {
    console.log(`${country.Name} => ${country.SurfaceArea}`);
  });
});

//cities in the Netherlands?
database.query('SELECT * FROM city WHERE country_code = "NLD"'),
  (error, result) => {
    if (error) throw error;

    console.log(`\n The cities in the Netherlands are :`);
    result.forEach(city => {
      console.log(city.name);
    });
  };

//==========================
// What's the population of Rotterdam?
database.query('SELECT * FROM city WHERE name = "Rotterdam"', (error, result) => {
  if (error) throw error;

  console.log(` Population of Rotterdam is:`);
  result.forEach(city => {
    console.log(city.Population);
  });
});

// top 10 countries based on surface area?
database.query('SELECT * FROM country ORDER BY surface_area DESC LIMIT 10', (error, result) => {
  if (error) throw error;

  console.log(`\n Top 10 countries based on surface area:`);
  result.forEach(country => {
    console.log(country.Name);
  });
});

// top 10 cities with the highest population?
database.query('SELECT FROM city ORDER BY population DESC LIMIT 10', (error, result) => {
  if (error) throw error;

  console.log(`\n Top 10 cities with the highest population:`);
  result.forEach(city => {
    console.log(` city name :${city.Name} , population : ${city.Population}`);
  });
});

database.end();
