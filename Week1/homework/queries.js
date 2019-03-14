'use strict';
// const util = require('util');
const mysql = require('mysql');
// const fs = require('fs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser2',
  password: 'hyfpassword',
  database: 'world',
});

// const executeQuery = util.promisify(connection.query.bind(connection));

function createQueries() {
  // connection.connect();

  // try {
  //   await executeQuery(`SELECT country_name FROM countries WHERE population > 8000000`);
  //   // await console.log(firstQuery);
  //   await executeQuery(`SELECT country_name FROM countries WHERE country_name LIKE '%land%'`);
  //   await executeQuery(
  //     `SELECT city_name, population FROM cities WHERE population BETWEEN 500000 AND 1000000`
  //   );
  //   await executeQuery(`SELECT country_name FROM countries WHERE continent_name LIKE '%Europe%'`);
  //   await executeQuery(`SELECT country_name FROM countries ORDER BY surface_area DESC`);
  // } catch (error) {
  //   console.log(error);
  // }

  connection.connect(error => {
    if (error) throw error;
    connection.query(
      `SELECT country_name FROM countries WHERE population > 8000000`,
      (error, result) => {
        if (error) throw error;
        console.log(
          `Countries have bigger than 8 million population: ${Array.from(result).map(
            element => element.country_name
          )}`
        );
      }
    );
    connection.query(
      `SELECT country_name FROM countries WHERE country_name LIKE '%land%'`,
      (error, result) => {
        if (error) throw error;
        console.log(
          `Country names that has 'land' word in it: ${Array.from(result).map(
            element => element.country_name
          )}`
        );
      }
    );
    connection.query(
      `SELECT city_name, population FROM cities WHERE population BETWEEN 500000 AND 1000000`,
      (error, result) => {
        if (error) throw error;

        console.log(
          `Cities that have population between 500.000 and 1.000.000: ${Array.from(result).map(
            element => element.city_name
          )}`
        );
      }
    );
    connection.query(
      `SELECT country_name FROM countries WHERE continent_name LIKE '%Europe%'`,
      (error, result) => {
        if (error) throw error;
        console.log(
          `Countries that in Europe: ${Array.from(result).map(element => element.country_name)}`
        );
      }
    );
    connection.query(
      `SELECT country_name FROM countries ORDER BY surface_area DESC`,
      (error, result) => {
        if (error) throw error;
        console.log(
          `Countries ordered descending by surface area: ${Array.from(result).map(
            element => element.country_name
          )}`
        );
      }
    );
    connection.end();
  });
}

module.exports = createQueries;
