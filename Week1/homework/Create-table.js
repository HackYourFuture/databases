var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

connection.connect();

var world_db = 'CREATE DATABASE IF NOT EXISTS World ';
connection.query(world_db, function(error, result) {
  if (error) throw error;
  console.log('Created Database ');
});

connection.query('USE World');

var create_tables = [
  'CREATE TABLE IF NOT EXISTS countries (country_id INT , country_name VARCHAR(50), country_population INT, continent VARCHAR(50),surface_areas INt) ',
  'CREATE TABLE IF NOT EXISTS cities (city_id INT , city_name VARCHAR(50),city_population INT) ',
];

for (var i in create_tables) {
  connection.query(create_tables[i], function(error, results) {
    if (error) throw error;
    console.log('Created new table');
  });
}

var countries = [
  "INSERT IGNORE  countries VALUES(1, 'Syria', 18000000, 'Asia',185180)",
  "INSERT IGNORE  countries VALUES(2, 'Netherlands', 17000000, 'Europe',42508)",
  "INSERT IGNORE  countries VALUES(3, 'Spain', 46000000, 'europe',505990)",
  "INSERT IGNORE  countries VALUES(4, 'United Kingdom',  6695000, 'Europe',242495)",
  "INSERT IGNORE  countries VALUES(5, 'Romania',  19483400, 'Europe',238397)",
  "INSERT IGNORE  countries VALUES(6, 'USA',  325000000, 'North America',9834000)",
  "INSERT IGNORE  countries VALUES(7, 'India',  1324009090, 'Asia',3287590)",
  "INSERT IGNORE  countries VALUES(8, 'Poland',  38028278, 'Europe',312685)",
  "INSERT IGNORE  countries VALUES(9, 'China',  1387160730, 'Asia',9597000)",
  "INSERT IGNORE  countries VALUES(10, 'Germany',  82438700, 'Europe',357021)"
];

for (var i in countries) {
  connection.query(countries[i], function(error, results) {
    if (error) throw error;
    console.log('Inserted new country');
  });
}

var cities = [
  "INSERT IGNORE cities VALUES(1, 'Damascus',1711000)",
  "INSERT IGNORE cities VALUES(2, 'Amsterdam', 1131690)",
  "INSERT IGNORE cities VALUES(3, 'Rotterdam',  1007780)",
  "INSERT IGNORE cities VALUES(4, 'London',9046485)",
  "INSERT IGNORE cities VALUES(5, 'Brasilia',2481000)",
  "INSERT IGNORE cities VALUES(6, 'Tokyo',9273000)",
  "INSERT IGNORE cities VALUES(7, 'Berlin', 3575000)",
  "INSERT IGNORE cities VALUES(8, 'vienna', 1900547)",
  "INSERT IGNORE cities VALUES(9, 'frankfort', 759657)",
  "INSERT IGNORE cities VALUES(10, 'Bern', 133115)"
];

for (var i in cities) {
  connection.query(cities[i], function(error, results) {
    if (error) throw error;
    console.log('Inserted new city ');
  });
}

connection.end();
