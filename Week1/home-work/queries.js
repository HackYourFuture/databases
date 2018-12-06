var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'hyfuser',
   password: 'hyfpassword',
   database: 'world'
});

connection.connect();

function populationMoreThan20() {
   var result = "SELECT * FROM countries WHERE countries.country_population >= 20000000";
   connection.query(result, function (error, result) {
      if (error) throw error;
      console.log("countries with population greater than 20 million\n", result)
   })
};

function withLand() {
   var result = "SELECT * FROM countries WHERE countries.country_name LIKE '%land%'";
   connection.query(result, function (error, result) {
      if (error) throw error;
      console.log("countries with the word land\n", result)
   })
};

function between() {
   var result = "SELECT country_name, country_population FROM countries WHERE countries.country_population BETWEEN 500000 AND 1000000";
   connection.query(result, function (error, result) {
      if (error) throw error;
      else if (result == 0) console.log('No countries with population between 500,000 and 1 million')
      else console.log(result);
   })
};


function euroCountries() {
   var result = "SELECT countries.country_name, countries.continent FROM countries WHERE countries.continent LIKE '%europe%'";
   connection.query(result, function (error, result) {
      if (error) throw error;
      console.log("countries in europe\n", result)
   })
};


function descendingOrder() {
   var result = "SELECT * FROM countries ORDER BY countries.country_size DESC";
   connection.query(result, function (error, result) {
      if (error) throw error;
      console.log("countries in descending order\n", result)
   })
};

function citiesInNetherlands() {
   var result = "SELECT * FROM cities WHERE cities.country LIKE '%Netherlands%'";
   connection.query(result, function (error, result) {
      if (error) throw error;
      console.log("cities in the Netherlands\n", result)
   })
};

function rotterdamPopulation() {
   var result = "SELECT cities.city_population AS Rotterdam_Population FROM cities WHERE cities.city_name ='Rotterdam'";
   connection.query(result, function (error, result) {
      if (error) throw error;
      console.log(result)
   })
};

function topBySurface() {
   var result = "SELECT country_name,country_size  FROM countries ORDER BY countries.country_size ASC LIMIT 5";
   connection.query(result, function (error, result) {
      if (error) throw error;
      console.log("top 5 countries by Surface Area ", result)
   })
};

function mostPopulatedCities() {
   var result = "SELECT * FROM cities GROUP BY city_population ORDER BY city_population DESC";
   connection.query(result, function (error, result) {
      if (error) throw error;
      console.log("most populated cities", result)
   })
};

function worldPopulation() {
   var result = "SELECT SUM(city_population) AS cities_population, SUM(country_population) AS world_population FROM cities INNER JOIN countries ON city_population + country_population";
   connection.query(result, function (error, result) {
      if (error) throw error;
      console.log(result)
   })
};


connection.end();