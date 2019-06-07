'use strict';

const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const execQuery = util.promisify(connection.query.bind(connection));

// List of select queries
const queries = {
  POPULATION_GREATER_8MILLION: `SELECT name, population FROM country WHERE population > 8000000 ORDER BY population DESC;`,
  COUNTRIES_HAVE_LAND: `SELECT name FROM country WHERE name LIKE '%land%';`,
  CITIES_POPULATION: `SELECT name, population FROM city WHERE population BETWEEN 500000 AND 1000000 ORDER BY population DESC;`,
  COUNTRIES_OF_EUROPE: `SELECT name FROM country WHERE continent = 'Europe';`,
  COUNTRIES_BY_AREA: `SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;`,
  CITIES_OF_NETHERLANDS: `SELECT name FROM city WHERE CountryCode = 'NLD' ORDER BY name ASC;`,
  POPULATION_OF_ROTTERDAM: `SELECT population FROM city WHERE name = 'Rotterdam';`,
  TOP_10_COUNTRIES_AREA: `SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;`,
  TOP_10_CITIES_POPULATION: `SELECT name, population FROM city ORDER BY population DESC LIMIT 10;`,
  POPULATION_OF_WORLD: `SELECT SUM(population) FROM country;`,
};

/**
 * Function to execute the select queries asynchronously and to display the results of every query
 */
async function executeSelectQueries() {
  await connection.connect(error => {
    if (error) throw error;
    console.log('\nMysql connected...\n');
  });

  try {
    const query1 = await execQuery(queries.POPULATION_GREATER_8MILLION);
    console.log('\nThe names of the countries with population greater than 8 million are:');
    query1.forEach(country => {
      console.log(`${country.name}   =>  ${country.population}`);
    });

    const query2 = await execQuery(queries.COUNTRIES_BY_AREA);
    console.log('\nAll the countries in the descending order based on their surface areas are:');
    query2.forEach(country => {
      console.log(`${country.name}    =>   ${country.SurfaceArea}`);
    });

    const query3 = await execQuery(queries.CITIES_POPULATION);
    console.log('\nThe names of the cities with population in between 500,000 and 1 million are:');
    query3.forEach(city => {
      console.log(`${city.name}    =>   ${city.population}`);
    });

    const query4 = await execQuery(queries.COUNTRIES_OF_EUROPE);
    console.log('\nThe names of all the countries on the continent ‘Europe’ are:');
    query4.forEach(country => {
      console.log(country.name);
    });

    const query5 = await execQuery(queries.COUNTRIES_BY_AREA);
    console.log('\nAll the countries in the descending order based on their surface areas are:');
    query5.forEach(country => {
      console.log(`${country.name}    =>   ${country.SurfaceArea}`);
    });

    const query6 = await execQuery(queries.CITIES_OF_NETHERLANDS);
    console.log('\nThe names of all the cities in the Netherlands are:');
    query6.forEach(city => {
      console.log(city.name);
    });

    const query7 = await execQuery(queries.POPULATION_OF_ROTTERDAM);
    console.log('\nThe population of Rotterdam is:');
    query7.forEach(city => {
      console.log(city.population);
    });

    const query8 = await execQuery(queries.COUNTRIES_BY_AREA);
    console.log('\nThe top 10 countries based on surface area are:');
    query8.forEach(country => {
      console.log(`${country.name}    =>   ${country.SurfaceArea}`);
    });

    const query9 = await execQuery(queries.TOP_10_CITIES_POPULATION);
    console.log('\nThe top 10 cities with the highest population are:');
    query9.forEach(city => {
      console.log(`${city.name}    =>   ${city.population}`);
    });

    const query10 = await execQuery(queries.POPULATION_OF_WORLD);
    console.log('\nThe population of the world is:');
    query10.forEach(world => {
      console.log(world['SUM(population)']);
    });
  } catch (err) {
    console.log(err);
  }

  connection.end(error => {
    if (error) throw error;
    console.log('\nMysql disconnected...');
  });
}

executeSelectQueries();
