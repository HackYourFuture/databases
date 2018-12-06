var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'class17'
});

connection.connect();

//CREATE DATABASE
connection.query('CREATE  DATABASE IF NOT EXISTS WORLD', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.query('use world', function (error, results, fields) {
  if (error) throw error.message;
  console.log("The solution is:" + results);
});

// CREATE TABLES
const creat_query = ["create table if not exists countries (country_id int primary key, country_name varchar(50), population int, continent varchar(50) , surface float)",
  "create table if not exists cities (city_id int primary key, city_name varchar(50), population int, country_id int , Foreign Key (country_id) REFERENCES countries (country_id))"]
for (let i in creat_query) {
  connection.query(creat_query[i], function (error, result, fields) {
    if (error) {
      throw error;
    }
    console.log("the reply is", result[0]);
  })
}

