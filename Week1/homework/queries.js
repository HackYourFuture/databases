'use strict';

const connection = require('./connection');

const queries = {
  // 1. What are the names of countries with population greater than 8 million
  one: () => {
    connection.query(
      'SELECT DISTINCT country_name FROM countries WHERE country_population > 8000000',
      (err, result) => {
        if (err) throw err.message;
        console.log(`\nCountries with population greater than 8 million:\n`);
        result.forEach((country, index) => console.log(`${index + 1}- ${country.country_name}`));
      }
    );
    connection.end();
  },

  // 2. What are the names of countries that have “land” in their names ?
  two: () => {
    connection.query(
      'SELECT DISTINCT country_name FROM countries WHERE country_name LIKE "%land%"',
      (err, result) => {
        if (err) throw err.message;
        console.log(`\nCountries that have “land” in their names:\n`);
        result.forEach((country, index) => console.log(`${index + 1}- ${country.country_name}`));
      }
    ),
      connection.end();
  },

  // 3. What are the names of the cities with population in between 500,000 and 1 million ?
  three: () => {
    connection.query(
      'SELECT DISTINCT city_name FROM cities WHERE city_population BETWEEN 500000 AND 1000000',
      (err, result) => {
        if (err) throw err.message;
        console.log(`\nCities with population in between 500,000 and 1 million:\n`);
        result.forEach((city, index) => console.log(`${index + 1}- ${city.city_name}`));
      }
    );
    connection.end();
  },

  // 4. What's the name of all the countries on the continent ‘Europe’ ?
  four: () => {
    connection.query(
      'SELECT DISTINCT country_name FROM countries WHERE continent = "Europe"',
      (err, result) => {
        if (err) throw err.message;
        console.log(`\nCountries on the continent ‘Europe’:\n`);
        result.forEach((country, index) => console.log(`${index + 1}- ${country.country_name}`));
      }
    );
    connection.end();
  },

  // 5. List all the countries in the descending order of their surface areas.
  five: () => {
    connection.query(
      'SELECT DISTINCT country_name, surface_areas FROM countries ORDER BY surface_areas DESC',
      (err, result) => {
        if (err) throw err.message;
        console.log(`\nCountries in the descending order of their surface areas:\n`);
        result.forEach((country, index) =>
          console.log(`${index + 1}- ${country.country_name}: ${country.surface_areas}`)
        );
      }
    );
    connection.end();
  },

  // 6. What are the names of all the cities in the Netherlands?
  six: () => {
    connection.query(
      'SELECT DISTINCT city_name FROM cities WHERE country_Abbreviation_code ="NLD"',
      (err, result) => {
        if (err) throw err.message;
        console.log(`\nNames of all the cities in the Netherlands:\n`);
        result.forEach((city, index) => console.log(`${index + 1}- ${city.city_name}`));
      }
    );
    connection.end();
  },

  // 7. What is the population of Rotterdam ?
  seven: () => {
    connection.query(
      'SELECT DISTINCT city_population FROM cities WHERE city_name ="Rotterdam"',
      (err, result) => {
        if (err) throw err.message;
        result.forEach(city => console.log(`\nPopulation of Rotterdam: ${city.city_population}`));
      }
    );
    connection.end();
  },

  // 8. What's the top 10 countries by Surface Area ?
  eight: () => {
    connection.query(
      'SELECT DISTINCT country_name, surface_areas FROM countries ORDER BY surface_areas DESC LIMIT 10',
      (err, result) => {
        if (err) throw err.message;
        console.log(`\nTop 10 countries by surface area:\n`);
        result.forEach((country, index) =>
          console.log(`${index + 1}- ${country.country_name}: ${country.surface_areas}`)
        );
      }
    );
    connection.end();
  },

  // 9. What's the top 10 most populated cities?
  nine: () => {
    connection.query(
      'SELECT DISTINCT city_name, city_population FROM cities ORDER BY city_population DESC LIMIT 10',
      (err, result) => {
        if (err) throw err.message;
        console.log(`\nTop 10 most populated cities:\n`);
        result.forEach((city, index) =>
          console.log(`${index + 1}- ${city.city_name}: ${city.city_population}`)
        );
      }
    );
    connection.end();
  },

  // 10. What is the population of the world ?
  ten: () => {
    connection.query(
      'SELECT SUM (country_population) AS population_of_the_world FROM countries',
      (err, result) => {
        if (err) throw err.message;
        console.log();
        result.forEach(result =>
          console.log(`\nPopulation of the world: ${result.population_of_the_world}`)
        );
      }
    );
    connection.end();
  },

  // HELP

  help: () => {
    console.log(`
  To run this app:
  type: node index.js [options]
  
  Options:
    1..........Countries with population greater than 8 million
    2..........Countries that have “land” in their names
    3..........Cities with population in between 500,000 and 1 million
    4..........Countries on the continent ‘Europe’
    5..........Countries in the descending order of their surface areas
    6..........Names of all the cities in the Netherlands
    7..........Population of Rotterdam
    8..........Top 10 countries by surface area
    9..........Top 10 most populated cities
    10.........Population of the world
    help.......Show this help text
    `);
  },
};

module.exports = queries;
