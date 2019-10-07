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
  'create table country (name varchar(50), continent varchar(50), region varchar(50), surface_area float, independence_year date, population int, gnp float, gnp_old float, local_name varchar(50), government_form varchar(50), head_of_state text, capital varchar(50))';
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

//manually entering these took more time than the homework itself >_>, values might not represent real world data...

const inserts = [
  `insert into country values('United States of America', 'North America', 'Anglo-America', 9147590, '1776-07-04:00:00:00', 327167434, 20494000000000, 20294000000000, 'United States of America', 'Federal presidential constitutional republic', 'Donald J. Trump', 'Washington D.C.')`,
  `insert into country values('Netherlands', 'Europe', 'Low Countries', 41543, '1581-07-26:00:00:00', 17336891, 1044000000000, 1034000000000, 'Nederland', 'Unitary parliamentary constitutional monarchy', 'Willem-Alexander', 'Amsterdam')`,
  `insert into country values('Turkey', 'Asia', 'Middle East', 783356, '1923-10-29:00:00:00', 82003882, 706237000000., 20294000000000, 'Turkiye Cumhuriyeti', 'Unitary presidential constitutional republic', 'Some watermellon seller', 'Ankara')`,
  `insert into city values(01, 'Ankara', 'TR', '', 20000000)`,
  `insert into city values(02, 'Washington D.C.', 'USA', '', 4354345)`,
  `insert into city values(03, 'Amsterdam', 'NL', 'North Holland', 741636)`,
  `insert into city values(04, 'Rotterdam', 'NL', 'South Holland', 598199)`,
];

for (let i in inserts) {
  console.log('Running ', inserts[i]);
  connection.query(inserts[i], function(error, results, fields) {
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
