var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

connection.connect();

var questions = [
  'What are the names of the countries with population greater than 8 million',
  'What are the names of the countries that have “land” in their names ?',
  'What are the names of the cities with population in between 500,000 and 1 million ?',
  'What are the names of all the countries on the continent ‘Europe’ ?',
  'List all the countries in the descending order based on their surface areas.',
  'What are the names of all the cities in the Netherlands?',
  'Whats the population of Rotterdam?',
  'Whats the top 10 countries based on surface area?',
  'Whats the top 10 cities with the highest population?',
  'Whats the population of the world ?',
];

var create_and_insert_queries = [
  'create database world',
  'use world',
  'create table country (name varchar(50), continent varchar(50), region varchar(50), capital varchar(50), surface_area int,  population int, indep_year smallint, life_expectancy float, GNP BIGINT, GNPOld BIGINT, local_name varchar(50), government_form varchar(50), head_of_state varchar(50))',
  'create table city (id int NOT NULL AUTO_INCREMENT, name varchar(50), country_code int, district varchar(100), population int, PRIMARY KEY(id))',
  "insert into country values ('Netherlands', 'Europe', 'Europe', 'Amsterdam', 41198, 17132908, 1581, 81.9, 598000000000, 518000000000, 'Nederland/Holland', 'Constitutional monarchy', 'Ceremonial')",
  "insert into country values ('Germany', 'Europe', 'Europe', 'Berlin', 357578, 82438639, 1990, 81.0, 2852000000000, 2122000000000, 'Deutschland', 'Republic', 'Ceremonial')",
  "insert into country values ('Spain', 'Europe', 'Europe', 'Madrid', 520000, 46441049, 1807, 82.8, 1100000000000, 190000000000, 'España', 'Constitutional monarchy', 'Ceremonial')",
  "insert into country values ('United Kingdom', 'Europe', 'Europe', 'London', 242495, 66959016, 1992, 81.2, 2264000000000, 2124000000000, 'United Kingdom', 'Constitutional monarchy', 'Ceremonial')",
  "insert into country values ('France', 'Europe', 'Europe', 'Paris', 551695, 65480710, 1789, 82.4, 2178000000000, 2138000000000, 'France', 'Republic', 'Executive')",
  "insert into country values ('Egypt', 'Africa', 'Arab States', 'Cairo', 1010000, 101168745, 1922, 70.9, 92900000000, 92340000000, 'Misr', 'Republic', 'Executive')",
  "insert into country values ('Madagascar', 'Africa', 'Africa', 'Antananarivo', 587041, 26969642, 1960, 65.5, 5370000000, 5130000000, 'Madagascar', 'Republic', 'Executive')",
  "insert into country values ('Nigeria', 'Africa', 'Africa', 'Abuja', 923763, 200962417, 1960, 54.5, 74200000000, 74100000000, 'Nigeria', 'Republic', 'Executive')",
  "insert into country values ('Australia', 'Australia', 'Asia & Pacific', 'Canberra', 7692000, 25088636, 1931, 82.8, 655000000000, 345000000000, '	Australia', 'Constitutional monarchy', 'Ceremonial')",
  "insert into country values ('Japan', 'Asia', 'Asia & Pacific', 'Tokyo', 377973, 126854745, 1952, 83.7, 4988000000000, 4288000000000, 'Nippon', 'Constitutional monarchy', 'Ceremonial')",
  "insert into country values ('Turkey', 'Asia', 'Europe', 'Ankara', 783562, 82961805, 1923, 75.8, 342000000000, 333000000000, 'Turkiye', 'Republic', 'Executive')",
  "insert into country values ('Canada', 'North America', 'North America', 'Ottawa', 9985000, 37279811, 1931, 82.2, 1052000000000, 1009000000000, 'Canada', 'Constitutional monarchy', 'Ceremonial')",
  "insert into country values ('America', 'North America', 'North America', 'Washington', 9834000, 329093110, 1776, 79.3, 12970000000000, 12550000000000, 'United States', 'Republic', 'Executive')",
  "insert into country values ('Brazil', 'South America', 'South/Latin America', 'Brasilia', 8516000, 212392717, 1822, 75.0, 644000000000, 234000000000, 'Brasil', 'Republic', 'Executive')",
  "insert into city values (1, 'Amsterdam', 31, 'Berlin district1-Berlin district2-Berlin district3-Berlin district4-Berlin district5', 821752)",
  "insert into city values (2, 'Rotterdam', 31, 'Kop van Zuid-Delfshaven-de Stadsdriehoek-Cool District-Dijkzigt-Nieuwe Werk', 623652)",
  "insert into city values (3, 'Berlin', 49, 'Berlin district1-Berlin district2-Berlin district3-Berlin district4-Berlin district5', 3575000)",
  "insert into city values (4, 'London', 44, 'London district1-London district2-London district3-London district4-London district5', 8136000)",
  "insert into city values (5, 'Paris', 33, 'Paris district1-Paris district2-Paris district3-Paris district4-Paris district5', 2141000)",
  "insert into city values (6, 'Istanbul', 90, 'Istanbul district1-Istanbul district2-Istanbul district3-Istanbul district4', 15070000)",
  "insert into city values (7, 'Los Angeles', 1, 'Los Angeles district1-Los Angeles district2-Los Angeles district3', 4000000)",
  "insert into city values (8, 'Dubai', 971, 'Dubai district1-Dubai district2-Dubai district3-Dubai district4-Dubai district5', 3137000)",
  "insert into city values (9, 'Ottawa', 1, 'Ottawa district1-Ottawa district2-Ottawa district3-Ottawa district4-Ottawa district5', 994837)",
  "insert into city values (10, 'New Delhi', 91, 'New Delhi district1-New Delhi district2-New Delhi district3-New Delhi district4', 21750000)",
];

var select_queries = [
  'select name as Country_Name, population as Population from country where population > 8000000',
  "select name as Country_Name from country where name like '%land%' ",
  'select name as City_Name, population as Population from city where population > 500000 and population < 1000000',
  "select name as Country_Name, continent as Continent_Name from country where continent = 'Europe'",
  'select name as Country_Name, surface_area as Surface_Area from country order by surface_area desc',
  'select name as City_Name, country_code as Country_Code_Of_Netherlands from city where country_code = 31',
  "select population as Population, name as City_Name from city where name = 'Rotterdam'",
  'select name as Country_Name, surface_area as Surface_Area from country order by surface_area desc limit 10',
  'select name as City_Name, population as Population from city order by population desc limit 10',
  'select sum(population) as Population_Of_World from country',
];

//Executing queries to create database and tables and inserting records to the tables
create_and_insert_queries.forEach(query => {
  connection.query(query, error => {
    if (error) {
      throw error;
    }
  });
});

//Executing select queries and displaying result of queries
for (let i = 0; i < select_queries.length; i++) {
  connection.query(select_queries[i], (error, rows) => {
    console.log('QUESTION : ' + questions[i]);
    console.log('QUERY : ' + select_queries[i] + '\n');
    console.log('############################-RESULTS-############################\n');
    console.log(rows);
    console.log('\n');
    if (error) {
      throw error;
    }
  });
}

connection.end();
