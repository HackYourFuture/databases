const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world'
});


connection.connect();

// Answer number (1)
let counties_les = "select * from countries where countries.country_population < 80000000"
connection.query(counties_les, function (error, results) {
  if (error) {
    throw error;
  }
  console.log(results);
});

// Answer number (2)
let countries_land = "select * from countries where country_name like '%land%'"
connection.query(countries_land, function (error, results) {
  if (error) {
    throw error;
  }
  console.log(results);
});

// Answer number (3)
let cities_pop = "select * from cities where city_population between 500000 and 1000000"
connection.query(cities_pop, function (error, results) {
  if (error) {
    throw error;
  }
  console.log(results);
});

// Answer number (4)
let europe_countries = "select * from countries where continent = 'europe'"
connection.query(europe_countries, function (error, results) {
  if (error) {
    throw error;
  }
  console.log(results);
});

// Answer number (5)
let all_countries = "select * from countries order by surface_area desc"
connection.query(all_countries, function (error, results) {
  if (error) {
    throw error;
  }
  console.log(results);
});

// Answer number (6)
let netherlands_cities = "select countries.country_name, cities.city_name from cities inner join countries on cities.country = countries.country_name where countries.country_name = 'netherlands'"
connection.query(netherlands_cities, function (error, results) {
  if (error) {
    throw error;
  }
  console.log(results);
});

// Answer number (7)
let rotterdam_population = "select city_population from cities where city_name = 'rotterdam'"
connection.query(rotterdam_population, function (error, results) {
  if (error) {
    throw error;
  }
  console.log(`the population of Rotterdam ${results}`);
});

// Answer number (8)
let top_surface = "select country_name, surface_area from countries order by surface_area desc limit 10"
connection.query(top_surface, function (error, results) {
  if (error) {
    throw error;
  }
  console.log(results);
});

// Answer number (9)
let top_surface_cities = "select city_name, city_population from cities order by city_population desc limit 10"
connection.query(top_surface_cities, function (error, results) {
  if (error) {
    throw error;
  }
  console.log(results);
});

// Answer number (10)
let world_population = "select sum(country_population) from countries"
connection.query(world_population, function (error, results) {
  if (error) {
    throw error;
  }
  console.log(results);
});


connection.end();