const sqlCreateWorldDB = `CREATE DATABASE IF NOT EXISTS world;`;
const sqlUseWorldDB = `USE world;`;
const sqlCreateCountry = `
CREATE TABLE country (
  Code VARCHAR(3) NOT NULL,
  Name VARCHAR(50) NOT NULL,
  Continent ENUM('Asia', 'Europe', 'North America', 'Africa', 'Oceania', 'Antarctica', 'South America') NOT NULL,
  Region VARCHAR(50) NULL,
  SurfaceArea FLOAT(10,2) NULL DEFAULT 0.00,
  IndepYear INT NULL,
  Population INT NULL DEFAULT 0,
  LifeExpectancy DECIMAL(3,1) NULL,
  GNP FLOAT(10,2) NULL,
  GNPOld FLOAT(10,2) NULL,
  LocalName VARCHAR(50) NOT NULL,
  GovernmentForm VARCHAR(50) NULL,
  HeadOfState VARCHAR(50) NULL,
  Capital INT NULL,
  PRIMARY KEY (Code));
`;

const sqlCreateCity = `
CREATE TABLE city (
  ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(50) NOT NULL,
  CountryCode VARCHAR(3) NOT NULL,
  District VARCHAR(50) NOT NULL,
  Population INT NOT NULL DEFAULT 0,
  PRIMARY KEY (ID),
  CONSTRAINT city_fk
    FOREIGN KEY (CountryCode)
    REFERENCES country (Code));
`;

const insertQueries = [
  `INSERT INTO country VALUES ('NLD','Netherlands','Europe','Western Europe',41526.00,1581,17084000,78.3,371362.00,360478.00,'Nederland','Constitutional Monarchy','Willem-Alexander',1);`,
  `INSERT INTO country VALUES ('CAN','Canada','North America','Central America',9970610.00,1867,37602103,79.4,371362.00,360478.00,'Canada','Constitutional Monarchy, Federation','Elisabeth II',2);`,
  `INSERT INTO country VALUES ('DEU','Germany','Europe','Western Europe',357022.00,1955,83019200,75.7,371362.00,360478.00,'Deutschland','Federal Republic','Frank-Walter Steinmeier',3);`,
  `INSERT INTO country VALUES ('JAM','Jamaica','North America','Caribbean',10990.00,1962,2890299,65.3,31366.00,30448.00,'Jamaica','Constitutional Monarchy','Elisabeth II',4);`,
  `INSERT INTO country VALUES ('VNM','Vietnam','Asia','Southeast Asia',331689.00,1945,94569072,69.3,371362.00,360478.00,'Viêt Nam','Socialistic Republic','Nguyen Phu Trong',5);`,
  `INSERT INTO city VALUES (1,'Amsterdam','NLD','Noord-Holland',821752);`,
  `INSERT INTO city VALUES (2,'Ottawa','CAN','Ontario',934243);`,
  `INSERT INTO city VALUES (3,'Berlin','DEU','Berliini',4105000);`,
  `INSERT INTO city VALUES (4,'Kingston','JAM','St. Andrew',666041);`,
  `INSERT INTO city VALUES (5,'Hanoi','VNM','Hanoi',7782000);`,
];

const selectQueries = [
  //* What are the names of the countries with population greater than 8 million
  `
  SELECT 
    name
  FROM
    country
  WHERE
    population > 8000000;
  `,
  //* What are the names of the countries that have “land” in their names ?
  `
  SELECT 
    name
  FROM
    country
  WHERE
    name LIKE '%land%';
  `,
  //* What are the names of the cities with population in between 500,000 and 1 million ?
  `
  SELECT 
    name
  FROM
    city
  WHERE
    population BETWEEN 500000 AND 1000000;
  `,
  //* What are the names of all the countries on the continent ‘Europe’ ?
  `
  SELECT 
    name
  FROM
    country
  WHERE
    Continent = 'Europe';
  `,
  //* List all the countries in the descending order based on their surface areas.
  `
  SELECT 
    name
  FROM
    country
  ORDER BY SurfaceArea DESC;
  `,
  //* What are the names of all the cities in the Netherlands?
  `
  SELECT 
    city.name AS CityName
  FROM
    city
        INNER JOIN
    country ON city.CountryCode = country.Code
  WHERE
    country.name = 'Netherlands';
  `,
  //* What's the population of Rotterdam?
  `
  SELECT 
    population
  FROM
    city
  WHERE
    Name = 'Rotterdam';
  `,
  //* What's the top 10 countries based on surface area?
  `
  SELECT 
    name
  FROM
    country
  ORDER BY SurfaceArea DESC
  LIMIT 10;
  `,
  //* What's the top 10 cities with the highest population?
  `
  SELECT 
    Name
  FROM
    city
  ORDER BY Population DESC
  LIMIT 10;
  `,
  //* What's the population of the world ?
  `
  SELECT 
    SUM(population) AS populationOfWorld
  FROM
    country;
  `,
];

module.exports = {
  sqlCreateCity,
  sqlCreateCountry,
  sqlCreateWorldDB,
  sqlUseWorldDB,
  selectQueries,
  insertQueries,
};
