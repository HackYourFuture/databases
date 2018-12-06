var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world'
});

connection.connect();

//What are the names of countries with population greater than 8 million?
const select_query1 = 'SELECT country_name FROM countries where population > 8000000';
connection.query(select_query1, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("The countries with population greater than 8 million are :\n", results, '\n');
})

//What are the names of countries that have “land” in their names ?
const select_query2 = 'SELECT country_name FROM countries where country_name like "%land%"';
connection.query(select_query2, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("The names of countries that have “land” in their names are :\n", results, '\n');
})

//What are the names of the cities with population in between 500,000 and 1 million ?
const select_query3 = 'SELECT city_name FROM cities where population between 500000 and 1000000';
connection.query(select_query3, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("The names of the cities with population in between 500,000 and 1 million are :\n", results, "\n");
})

//What's the name of all the countries on the continent ‘Europe’ ?
const select_query4 = 'SELECT country_name FROM countries where continent = "Europe"';
connection.query(select_query4, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("The name of all the countries on the continent ‘Europe’ are :\n", results, "\n");
})

//List all the countries in the descending order of their surface areas
const select_query5 = 'SELECT * FROM countries order by surface DESC';
connection.query(select_query5, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("All the countries in the descending order of their surface areas :\n", results, "\n");
})

//What are the names of all the cities in the Netherlands?
const select_query6 = 'SELECT city_name FROM cities JOIN countries on cities.Country_id = countries.country_id WHERE countries.country_name = "Netherlands"';
connection.query(select_query6, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("Names of all the cities in the Netherlands are :\n", results, "\n");
})

//What is the population of Rotterdam ?
const select_query7 = 'SELECT Population FROM cities where city_name = "rotterdam"';
connection.query(select_query7, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("Population of Rotterdam is :\n", results);
})

//What's the top 10 countries by Surface Area ?
const select_query8 = 'SELECT country_name, Surface FROM countries ORDER BY Surface DESC LIMIT 10';
connection.query(select_query8, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("The top 10 countries by Surface Area are :\n", results, "\n");
})

//What's the top 10 most populated cities?
const select_query9 = 'SELECT city_name, population FROM cities ORDER BY population DESC LIMIT 10';
connection.query(select_query9, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("The top 10 most populated cities are :\n", results, "\n");
})

//What is the population of the world ?
const select_query10 = 'SELECT sum(population) FROM countries';
connection.query(select_query10, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("the population of the world is :\n", results, "\n");
})
