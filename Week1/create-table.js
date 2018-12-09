var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: 'class17'
});

connection.connect();

connection.query("DROP DATABASE IF EXISTS world2", function (error, results, fields) {
  if (error) throw error;
  console.log("Database dropped.");
});
connection.query("CREATE DATABASE IF NOT EXISTS world2", function (error, results, fields) {
  if (error) throw error;
  console.log("Database created.");
});
connection.query("use world2", function (error, results, fields) {
  if (error) throw error;
  console.log("world2 is selected.");
});
connection.query("CREATE TABLE IF NOT EXISTS countries (country_number int, country_name varchar(50), country_surface double, population double, continent enum('Asia','Europe','North America','Africa','Oceania','Antarctica','South America'), PRIMARY KEY (country_number))", function (error, results, fields) {
  if (error) throw error;
  console.log("Countries table is created.");
});
connection.query("CREATE TABLE IF NOT EXISTS cities (city_number int, city_name varchar(50), population bigint, country_number int, PRIMARY KEY (city_number))", function (error, results, fields) {
  if (error) throw error;
  console.log("Cities table is created.");
});

connection.end();


/*

console.log("Connected!");
const queryDropDB = 'DROP DATABASE IF EXISTS world2';
const queryCreateDB = 'CREATE DATABASE IF NOT EXISTS world2';
const queryUseDB = 'USE world2';
const create_query_countries = "CREATE TABLE IF NOT EXISTS countries (country_number int, country_name varchar(50), country_surface double, population double, continent enum('Asia','Europe','North America','Africa','Oceania','Antarctica','South America'), PRIMARY KEY (country_number)) ";
const create_query_cities = "CREATE TABLE IF NOT EXISTS cities (city_number int, city_name varchar(50), population bigint, country_number int, PRIMARY KEY (city_number))";

runQueries(queryDropDB);
runQueries(queryCreateDB);
runQueries(queryUseDB);
runQueries(create_query_countries);
runQueries(create_query_cities);



function runQueries(query) {
  console.log('FUNCTION!!!!!');
  connection.query(query, function (error, results, fields) {
    console.log('Query: ' + query);
    console.log('The solution is: ', results[0]);
    if (err) throw err;
    //await result[0];
    console.log('The solution is: ', results[0]);
  });
}*/

//connection.connect();


//connection.end();
