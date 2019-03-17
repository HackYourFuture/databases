const connection = require('./connection');

const queries = {
  // 1. What are the names of countries with population greater than 8 million
  one: () => {
    connection.query(
      'SELECT country_name FROM countries WHERE country_population > 8000000',
      (err, result) => {
        if (err) throw err.message;
        console.log(`\nCountries with population greater than 8 million:\n`);
        result.forEach(country => console.log(`${country.country_name}`));
      },
    );
    connection.end();
  },
  // 2. What are the names of countries that have “land” in their names ?
  two: () => {
    connection.query(
      'SELECT country_name FROM countries WHERE country_name LIKE "%land%"',
      (err, result) => {
        if (err) throw err.message;
        console.log(`\nCountries that have “land” in their names:\n`);
        result.forEach(country => console.log(`${country.country_name}`));
      },
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
      },
    );
    connection.end();
  },

  // 4. What's the name of all the countries on the continent ‘Europe’ ?
  four: () => {
    connection.query(
      'SELECT country_name FROM countries WHERE country_continent = "Europe"',
      (err, result) => {
        if (err) throw err.message;
        console.log(`\nCountries on the continent ‘Europe’:\n`);
        result.forEach(country => console.log(`${country.country_name}`));
      },
    );
    connection.end();
  },

  // 5. List all the countries in the descending order of their surface areas.
  five: () => {
    connection.query(
      'SELECT country_name, surface_areas FROM countries ORDER BY surface_areas DESC',
      (err, result) => {
        if (err) throw err.message;
        console.log(`\nCountries in the descending order of their surface areas:\n`);
        result.forEach(country => console.log(`${country.country_name}: ${country.surface_areas}`));
      },
    );
    connection.end();
  },
};

module.exports = queries;
