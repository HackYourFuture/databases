'use strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect();

const selectQueries = [
  'CREATE DATABASE newWorld1',
  'USE newWorld1',
  'CREATE TABLE country(Name VARCHAR(50), Continent VARCHAR(50), Region VARCHAR(50), SurfaceArea INT, IndepYear SMALLINT, Population INT, LifeExpectancy FLOAT(10, 2), GNP FLOAT(10, 2), GNPOld FLOAT(10, 2), LocalName VARCHAR(50), GovernmentForm VARCHAR(50), HeadOfState VARCHAR(50), Capital VARCHAR(50))',
  'CREATE TABLE city(ID INT AUTO_INCREMENT, Name VARCHAR(50), CountryCode INT, District VARCHAR(50), Population INT, PRIMARY KEY(ID))',

  "INSERT INTO country(Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital) values('Germany', 'Europe', 'Western Europe', 357386, 1871, 82790000, 80.64, 92.77, 92.77, 'Duitland', 'Republic', 'Angela Merkel', 'Berlin')",
  "INSERT INTO country(Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital) values('The Netherlands', 'Europe', 'Western Europe', 42508, 1588, 17008000, 81.51, 903.09, 903.09, 'Nederland', 'Constitutional Monarchy', 'Mark Rutte', 'Amsterdam')",
  "INSERT INTO country(Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital) values('Sierra Leone', 'Africa', 'Western Africa', 71740, 1961, 7892497, 51.84, NULL, NULL, 'Salone', 'Republic', 'Julius Maada Bio', 'Freetown')",
  "INSERT INTO country(Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital) values('China', 'Asia', 'Eastern Asia', 9597000, 1949, 1386000000, 76.25, 319.16, 306.04, NULL, 'Communist', 'Xi Jinping', 'Beijing')",
  "INSERT INTO country(Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital) values('France', 'Europe', 'Western Europe', 643801, 1789, 66990000, 82.27, 839.87, 649.19, NULL, 'Republic', 'Emmanuel Macron', 'Paris')",
  "INSERT INTO country(Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital) values('Nigeria', 'Africa', 'Western Africa', 923763, 1960, 190900000, 53.43, 839.87, 378.95, 364.25, 'Federal Republic', 'Muhammadu Buhari', 'Abuja')",
  "INSERT INTO country(Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital) values('Poland', 'Europe', 'Eastern Europe', 312679, 1918, 38430000, 77.45, 504.46, 453.40, 'Polska', 'Republic', 'Andrzej Duda', 'Warsaw')",
  "INSERT INTO country(Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital) values('India', 'Asia', 'South Asia', 3280000, 1857, 1339000000, 68.56, 691.04, 623.37, NULL, 'Quasi-Federal', 'Ram Nath Kovind', 'New Delhi')",
  "INSERT INTO country(Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital) values('Spain', 'Europe', 'Western Europe', 505990, 1512, 46720000, 82.83, 335.57, 367.44, 'Espana', 'Parliamentary' 'Del Gobierno', 'Madrid')",
  "INSERT INTO country(Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital) values('Italy', 'Europe', 'Western Europe', 301338, 1946, 60590000, 82.54, 758.84, 731.27, NULL, 'Constitutional Monarchy', 'Sergio Mattarella', 'Rome')",
  "INSERT INTO country(Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital) values('Brazil', 'South America', 'Southern America', 8561000, 1822, 209300000, 75.51, 445.12, 460.22, NULL, 'Federal Representative', 'Jair Bolsonaro', 'Brasilia')",
  "INSERT INTO city(ID, Name, CountryCode, District, Population) values(1, 'The Hague', 31, 'South Holland', 474292)",
  "INSERT INTO city(ID, Name, CountryCode, District, Population) values(2, 'Amsterdam', 31, 'North Holland', 741636)",
  "INSERT INTO city(ID, Name, CountryCode, District, Population) values(3, 'Rotterdam', 31, 'South Holland', 598199)",
  "INSERT INTO city(ID, Name, CountryCode, District, Population) values(4, 'Utrecht', 31, 'Utrecht', 290529)",
  "INSERT INTO city(ID, Name, CountryCode, District, Population) values(5, 'Paris', 32, 'Paris Region', 2141000)",
  "INSERT INTO city(ID, Name, CountryCode, District, Population) values(6, 'Barcelona', 34, NULL, 1600000)",
  "INSERT INTO city(ID, Name, CountryCode, District, Population) values(7, 'London', 44, NULL, 8136000)",
  "INSERT INTO city(ID, Name, CountryCode, District, Population) values(8, 'Budapest', 36, NULL, 1756000)",
  "INSERT INTO city(ID, Name, CountryCode, District, Population) values(9, 'New York', 1, NULL, 8620000)",
  "INSERT INTO city(ID, Name, CountryCode, District, Population) values(10, 'Dublin', 35, NULL, 544107)",

  "SELECT Name AS 'Countries_Greater_Than_8million' FROM country WHERE Population > 8000000",
  "SELECT Name AS 'Countries_That_Have_LAND_In_Their_Names' FROM country WHERE Name LIKE '%LAND%'",
  'SELECT Name, Population FROM cities WHERE Population > 500000 AND Population < 1000000',
  "SELECT Name AS 'Countries_on_The_Continent_Europe' FROM country WHERE continent = 'Europe'",
  'SELECT Name, SurFaceArea FROM country ORDER BY SurFaceArea DESC',
  "SELECT Name AS 'Cities_In_The_Netherlands' FROM city WHERE CountryCode = 31",
  "SELECT Population AS 'Population_Of_Rotterdam' FROM cities WHERE Name = 'Rotterdam'",
  'SELECT Name, SurFaceArea FROM country ORDER BY SurFaceArea DESC LIMIT 10',
  "SELECT SUM(Population) AS 'Population_Of_The_World' FROM country",
];

for (const i in selectQueries) {
  console.log('Going to run ', selectQueries[i]);
  connection.query(selectQueries[i], function(error, results, fields) {
    if (error) throw error;
    console.log('The reply is ', results);
  });
}

connection.end();
