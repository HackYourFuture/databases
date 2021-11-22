const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

//Connect to world database
connection.connect((err) => {
  if (err) {
    throw error;
  }
  console.log('Mysql Connected');
});

//TODO 1) Names of the country with population grater than 8 million
let select_names =
  'SELECT Name,Population FROM country WHERE Population >8000000 ORDER BY Population ASC';
connection.query(select_names, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log(
    'Names of the country with population grater than 8 million:',
    results,
  );
  //console.table(results);
});

//TODO 2) The names of countries that have “land” in their names
let country_with_land = 'SELECT Name FROM country WHERE Name LIKE "%land%"';
connection.query(country_with_land, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log(
    'The names of countries that have “land” in their names:',
    results,
  );
  //console.table(results);
});

//TODO 3) The names of the cities with population in between 500,000 and 1 million
let city_with_population =
  'SELECT Name,Population FROM city WHERE Population BETWEEN 500000 AND 1000000 ORDER BY Population ASC';
connection.query(city_with_population, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log(
    'The names of the cities with population in between 500,000 and 1 million:',
    results,
  );
  //console.table(results);
});

//TODO 4) the name of all the countries on the continent ‘Europe’
let europe_countries = 'SELECT Name FROM country WHERE Continent = "Europe"';
connection.query(europe_countries, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('The name of all the countries on the continent Europe', results);
  //console.table(results);
});

//TODO 5) List all the countries in the descending order of their surface areas
let countries_surfaces =
  'SELECT Name,SurfaceArea FROM country ORDER BY  SurfaceArea DESC';
connection.query(countries_surfaces, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log(
    'All the countries in the descending order of their surface areas',
    results,
  );
  //console.table(results);
});

//TODO 6) The names of all the cities in the Netherlands
let cities_in_netherlands = 'SELECT Name FROM city WHERE CountryCode = "NLD"';
connection.query(cities_in_netherlands, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('The names of all the cities in the Netherlands', results);
  //console.table(results);
});

//TODO 7) The population of Rotterdam

let population_of_rotterdam =
  'SELECT Population FROM city WHERE Name = "Rotterdam"';
connection.query(population_of_rotterdam, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('The population of Rotterdam is:', results);
  //console.table(results);
});

//TODO 8)  The top 10 countries by Surface Area
let top_10_countries_by_surfaceArea =
  'SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10';
connection.query(
  top_10_countries_by_surfaceArea,
  function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(' The top 10 countries by Surface Area are:', results);
    //console.table(results);
  },
);

//TODO 9) The top 10 most populated cities
let top_10_countries_by_population =
  'SELECT Name,Population FROM city ORDER BY Population DESC LIMIT 10';
connection.query(
  top_10_countries_by_population,
  function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(' The top 10 most populated cities are:', results);
    //console.table(results);
  },
);

//TODO 10) The population number of the world

let population_of_world =
  'SELECT SUM(Population) AS WorldPopulation FROM country';
connection.query(population_of_world, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log(' The population number of the world is:', results);
  //console.table(results);
});

connection.end();

app.listen('3000', () => {
  console.log('Server started on port 3000');
});
