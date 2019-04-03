var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

connection.connect();

function populationMoreThan8() {
  var result = 'SELECT * FROM countries WHERE countries.country_population >= 8000000';
  connection.query(result, function(error, result) {
    if (error) throw error;
    console.log('countries with population greater than 20 million\n', result);
  });
}

function withLand() {
  var result = "SELECT * FROM countries WHERE countries.country_name LIKE 'land'";
  connection.query(result, function(error, result) {
    if (error) throw error;
    console.log('countries with the word land\n', result);
  });
}

function populationInBetween() {
  var result =
    'SELECT country_name, country_population FROM countries WHERE countries.country_population BETWEEN 500000 AND 1000000';
  connection.query(result, function(error, result) {
    if (error) throw error;
    else if (result == 0) console.log('No countries with population between 500,000 and 1 million');
    else console.log(result);
  });
}

function euroCountries() {
  var result =
    "SELECT countries.country_name, countries.continent FROM countries WHERE countries.continent LIKE 'Europe'";
  connection.query(result, function(error, result) {
    if (error) throw error;
    console.log('countries in europe\n', result);
  });
}

function descendingOrder() {
  var result = 'SELECT * FROM countries ORDER BY countries.surface_areas DESC';
  connection.query(result, function(error, result) {
    if (error) throw error;
    console.log('countries in descending order\n', result);
  });
}

function rotterdamPopulation() {
  var result =
    "SELECT cities.city_population AS Rotterdam_Population FROM cities WHERE cities.city_name ='Rotterdam'";
  connection.query(result, function(error, result) {
    if (error) throw error;
    console.log(result);
  });
}

function topBySurface() {
  var result =
    'SELECT country_name,surface_areas FROM countries ORDER BY countries.surface_areas ASC LIMIT 10';
  connection.query(result, function(error, result) {
    if (error) throw error;
    console.log('top 5 countries by Surface Area ', result);
  });
}

function mostPopulatedCities() {
  var result = 'SELECT * FROM cities GROUP BY city_population ORDER BY city_population DESC';
  connection.query(result, function(error, result) {
    if (error) throw error;
    console.log('most populated cities', result);
  });
}

connection.end();

module.exports = {
  mostPopulatedCities,
  topBySurface,
  rotterdamPopulation,
  descendingOrder,
  euroCountries,
  populationInBetween,
  withLand,
  populationMoreThan8,
};
