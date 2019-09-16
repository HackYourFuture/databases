const mysql = require('mysql');
const executeQuery = require('./executeQuery');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql1',
});

connection.connect();

executeQuery.fnExecuteQuery(connection, 'CREATE DATABASE world');
executeQuery.fnExecuteQuery(connection, 'use world');

executeQuery.fnExecuteQuery(
  connection,
  'create table country(\
    name VARCHAR(50),\
    continent VARCHAR(25),\
    region VARCHAR(50),\
    surfacearea float,\
    indepyear INT,\
    population INT,\
    lifeexpectancy float,\
    gnp float,\
    gnpold float,\
    localname VARCHAR(50),\
    govermentform VARCHAR(50),\
    headofstate VARCHAR(50),\
    capital VARCHAR(50)\
    )',
);

executeQuery.fnExecuteQuery(
  connection,
  'create table city (id INT, name varchar(50), countrycode varchar(5), district varchar(25),population int )',
);

const country_values = [
  "insert into  country values ( 'Netherlands','Europe','Western Europe',42508, 1945, 17000000,82,901,890,'Nederlands','parliamentary','Willem-Alexander','Amsterdam')",
  "insert into country values ( 'Nepal','Asia','Southern asia',147181.00,1769,23930000,57.8,4768.00,4837.00,'Nepal','Constitutional Monarchy','Gyanendra Bir Bikram','Kathmandu')",
  "insert into country values ( 'Uruguay','South America','South America',175016.00,1828,3337000,75.2,20831.00,19967.00,'Uruguay','Republic','Jorge Batlle','Montevideo')",
];
country_values.forEach(query => {
  executeQuery.fnExecuteQuery(connection, query);
});
const city_values = [
  "INSERT INTO `city` VALUES (1,'Amsterdam','NLD','Noord-Holland',731200)",
  "INSERT INTO `city` VALUES (2,'Rotterdam','NLD','Zuid-Holland',593321)",
  "insert into  city values (3,'Haarlem','NL','NorthHolland',161213 )",
  "INSERT INTO `city` VALUES (4,'Haag','NLD','Zuid-Holland',440900);",
  "insert into  city values (5,'Arnhem','NL','Gelderland',159277 )",
  "INSERT INTO `city` VALUES (6,'Eindhoven','NLD','Noord-Brabant',201843)",
  "INSERT INTO `city` VALUES (17,'Almere','NLD','Flevoland',142465)",
  "INSERT INTO `city` VALUES (18,'Arnhem','NLD','Gelderland',138020)",
  "INSERT INTO `city` VALUES (19,'Zaanstad','NLD','Noord-Holland',135621)",
];

city_values.forEach(query => {
  executeQuery.fnExecuteQuery(connection, query);
});

const select_query = [
  'select name from country where population>=8000000',
  "select name from country where name LIKE '%land%'",
  'select name from city where population>=500000 and population<= 1000000',
  "select name from country where continent ='Europe' ",
  'select name,surfacearea from country ORDER BY surfacearea DESC',
  "select name,population from city where name = 'Rotterdam'",
  "select name from city where countrycode = 'NL'",
  'SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10',
  'SELECT SUM(Population) FROM country',
];
select_query.forEach(query => {
  executeQuery.fnExecuteQuery(connection, query);
});
connection.end();
