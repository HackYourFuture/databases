var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'class17'
});

connection.connect();

var create_query_world = "CREATE TABLE IF NOT Exits` world (world_number int, world_name varchar(50), PRIMARY KEY (world_number) ) ";
var create_query_countries = "CREATE TABLE IF NOT EXISTS countries (country_number int, country_name varchar(50), country_surface double, population double, world_number int, PRIMARY KEY (country_number)) ";
var create_query_cities = "CREATE TABLE IF NOT EXISTS cities (city_number int, city_name varchar(50), population bigint, country_number int, PRIMARY KEY (city_number))";

connection.query(create_query_world, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("the reply is ", results[0]);
});
connection.query(create_query_countries, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("the reply is ", results[0]);
});
connection.query(create_query_cities, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("the reply is ", results[0]);
});

connection.end();
