var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect();
const database = 'create database if not exists world';
const useDatabase = 'use world';

const countries =
  'create table country (name varchar(50), continent varchar(50), region varchar(50), surface_area int, independence_year date, population int, gnp int, gnp_old int, local_name varchar(50), government_form varchar(50), head_of_state text, capital varchar(50))';
const cities =
  'create table city (id int, name varchar(50), country_code varchar(3), district varchar(50), population int)';
var create_queries = [database, useDatabase, countries, cities];

for (var i in create_queries) {
  console.log('Going to run ', create_queries[i]);
  connection.query(create_queries[i], function(error, fields) {
    if (error) {
      throw error;
    }
  });
}

const additional_queries = [
  `select country.name, country.population from country where country.population > 8000000;`,
  `select country.name from country where country.name like '%land%';`,
  `select city.name, city.population from city where city.population > 500000 and city.population < 1000000;`,
  `select country.name from country where country.continent = 'Europe';`,
  `select country.name, country.surface_area from country order by country.surface_area desc;`,
  `select city.name from city where city.country_code = 'NLD';`,
  `select city.population from city where city.name = 'Rotterdam';`,
];

for (let i in additional_queries) {
  console.log('Running ', additional_queries[i]);
  connection.query(additional_queries[i], function(error, results, fields) {
    if (error) {
      throw error;
    }
  });
}

console.log('***Successfully created tables and submitted queries***');

connection.end();
