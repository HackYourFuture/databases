var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'hyfuser',
   password: 'hyfpassword',
   database: 'userdb'
});

connection.connect();

var world_db = "CREATE DATABASE IF NOT EXISTS World ";
connection.query(world_db, function (error, result) {
   if (error) throw error;
   console.log('Created Database ');
});

connection.query("USE World");

var create_tables = [
   "CREATE TABLE IF NOT EXISTS countries (country_number INT UNIQUE, country_name VARCHAR(50), capital VARCHAR(50), country_size INT, country_population INT, continent VARCHAR(50), number_of_cities INT) ",
   "CREATE TABLE IF NOT EXISTS cities (city_number INT UNIQUE, city_name VARCHAR(50), country VARCHAR(50), city_size INT, city_population INT, zip_code INT ) "
]

for (var i in create_tables) {
   connection.query(create_tables[i], function (error, results) {
      if (error) throw error;
      console.log('Created new table');
   });
}

var insert_countries = [
   "INSERT IGNORE  countries VALUES(1, 'Syria', 'Damascus', 185000, 18000000, 'Asia', 79)",
   "INSERT IGNORE  countries VALUES(2, 'Netherlands', 'Amsterdam', 42000, 17000000, 'europe', 284)",
   "INSERT IGNORE  countries VALUES(3, 'Spain', 'Madrid', 505000, 46000000, 'europe', 858)",
   "INSERT IGNORE  countries VALUES(4, 'Brazil', 'Brasilia', 8515770, 209000000, 'South America', 1639)",
   "INSERT IGNORE  countries VALUES(5, 'Japan', 'Tokyo', 377000, 126000000, 'Asia', 743)",
   "INSERT IGNORE  countries VALUES(6, 'USA', 'Washington D.C.', 9833517, 325000000, 'North America', 3144)"
]

for (var i in insert_countries) {
   connection.query(insert_countries[i], function (error, results) {
      if (error) throw error;
      console.log("Inserted new country")
   })
}

var insert_cities = [
   "INSERT IGNORE cities VALUES(1, 'Damascus', 'Syria', 105, 1700000, 20872)",
   "INSERT IGNORE cities VALUES(2, 'Amsterdam', 'Netherlands', 219, 821000, 1012)",
   "INSERT IGNORE cities VALUES(3, 'Rotterdam', 'Netherlands', 325, 623000, 3065)",
   "INSERT IGNORE cities VALUES(4, 'Madrid', 'Spain', 604, 3166000, 28000)",
   "INSERT IGNORE cities VALUES(5, 'Brasilia', 'Brazil',  5780, 2481000, 11001)",
   "INSERT IGNORE cities VALUES(6, 'Tokyo', 'Japan', 2188, 9273000, 13010)",
   "INSERT IGNORE cities VALUES(7, 'Washington D.C.','USA',  177, 693972, 270)"
]

for (var i in insert_cities) {
   connection.query(insert_cities[i], function (error, results) {
      if (error) throw error;
      console.log("Inserted new city ")
   })
}


connection.end();