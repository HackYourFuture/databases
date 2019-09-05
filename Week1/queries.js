const sqlCreateWorldDB = `CREATE DATABASE IF NOT EXISTS world;`;
const sqlUseWorldDB = `USE world;`;
const sqlCreateCountry = `
DROP TABLE IF EXISTS country;
CREATE TABLE country (
  Code VARCHAR(5) NOT NULL,
  Name VARCHAR(50) NOT NULL,
  Continent ENUM('Asia', 'Europe', 'North America', 'Africa', 'Oceania', 'Antarctica', 'South America') NOT NULL,
  Region VARCHAR(50) NULL,
  SurfaceArea DECIMAL(10,2) NULL DEFAULT 0.00,
  IndepYear INT NULL,
  Population INT NULL DEFAULT 0,
  LifeExpectancy DECIMAL(3,1) NULL,
  GNP DECIMAL(10,2) NULL,
  GNPOld DECIMAL(10,2) NULL,
  GovernmentForm VARCHAR(50) NULL,
  HeadOfState VARCHAR(50) NULL,
  Capital VARCHAR(50) NULL,
  PRIMARY KEY (Code));
`;

const sqlCreateCity = `CREATE TABLE city (
  ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(50) NOT NULL,
  CountryCode VARCHAR(5) NOT NULL,
  District VARCHAR(50) NOT NULL,
  Population INT NOT NULL DEFAULT 0,
  PRIMARY KEY (ID),
  CONSTRAINT city_fk
    FOREIGN KEY (CountryCode)
    REFERENCES country (Code));
`;

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
};
