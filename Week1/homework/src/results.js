'use-strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

function one() {
  connection.connect();
  connection.query(
    'SELECT name, population FROM countries WHERE population > 8000000 LIMIT 20',
    function(error, results) {
      if (error) throw error.message;
      console.log(`
        1- Top 20 countries with population greater than 8 million:
        `);
      results.forEach(country => console.log(JSON.parse(JSON.stringify(country))));
      console.log(`
        `);
    }
  );
  connection.end();
}

function two() {
  connection.connect();
  connection.query('SELECT name FROM countries WHERE name LIKE "%land%" LIMIT 20', function(
    error,
    results
  ) {
    if (error) throw error.message;
    console.log(`
        2- Top 20 countries that have “land” in their names:
        `);
    results.forEach(country => console.log(JSON.parse(JSON.stringify(country))));
    console.log(`
        `);
  });
  connection.end();
}

function three() {
  connection.connect();
  connection.query(
    'SELECT name, population FROM cities WHERE population BETWEEN 500000 AND 1000000',
    function(error, results) {
      if (error) throw error.message;
      console.log(`
        3- Cities with population in between 500,000 and 1 million:
        `);
      results.forEach(city => console.log(JSON.parse(JSON.stringify(city))));
      console.log(`
        `);
    }
  );
  connection.end();
}

function four() {
  connection.connect();
  connection.query('SELECT name, region FROM countries WHERE region = "Europe"', function(
    error,
    results
  ) {
    if (error) throw error.message;
    console.log(`
        4- Countries on the continent ‘Europe’:
        `);
    results.forEach(country => console.log(JSON.parse(JSON.stringify(country))));
    console.log(`
        `);
  });
  connection.end();
}

function five() {
  connection.connect();
  connection.query('SELECT name, area FROM countries ORDER BY area DESC LIMIT 20', function(
    error,
    results
  ) {
    if (error) throw error.message;
    console.log(`
      5- Top 20 countries in the descending order of their surface areas:
      `);
    results.forEach(country => console.log(JSON.parse(JSON.stringify(country))));
    console.log(`
        `);
  });
  connection.end();
}

function six() {
  connection.connect();
  connection.query('SELECT name  FROM cities WHERE country ="Netherlands"', function(
    error,
    results
  ) {
    if (error) throw error.message;
    console.log(`
      6- Names of all the cities in the Netherlands:
      `);
    results.forEach(city => console.log(JSON.parse(JSON.stringify(city))));
    console.log(`
        `);
  });
  connection.end();
}

function seven() {
  connection.connect();
  connection.query('SELECT name, population  FROM cities WHERE name ="Rotterdam"', function(
    error,
    results
  ) {
    if (error) throw error.message;
    console.log(`
        7- Population of Rotterdam:
        `);
    results.forEach(city => console.log(JSON.parse(JSON.stringify(city))));
    console.log(`
        `);
  });
  connection.end();
}

function eight() {
  connection.connect();
  connection.query('SELECT name, area FROM countries ORDER BY area DESC LIMIT 10', function(
    error,
    results
  ) {
    if (error) throw error.message;
    console.log(`
      8- Top 10 countries by surface area:
      `);
    results.forEach(country => console.log(JSON.parse(JSON.stringify(country))));
    console.log(`
        `);
  });
  connection.end();
}

function nine() {
  connection.connect();
  connection.query(
    'SELECT name, population FROM cities ORDER BY population DESC LIMIT 10',
    function(error, results) {
      if (error) throw error.message;
      console.log(`
        9- Top 10 most populated cities:
        `);
      results.forEach(city => console.log(JSON.parse(JSON.stringify(city))));
      console.log(`
        `);
    }
  );
  connection.end();
}

function ten() {
  connection.connect();
  connection.query('SELECT  SUM (population) AS populationOfTheWorld FROM countries', function(
    error,
    results
  ) {
    if (error) throw error.message;
    console.log(`
      10- Population of the world:
      `);
    results.forEach(result => console.log(JSON.parse(JSON.stringify(result))));
    console.log(`
        `);
  });
  connection.end();
}

module.exports = { one, two, three, four, five, six, seven, eight, nine, ten };
