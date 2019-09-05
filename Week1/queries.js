const sqlCreateWorldDB = `CREATE DATABASE IF NOT EXISTS world;`;
const sqlUseWorldDB = `USE world;`;
const sqlCreateCountry = `
CREATE TABLE country (
    Code CHAR(3) NOT NULL DEFAULT '',
    Name CHAR(52) NOT NULL DEFAULT '',
    Continent ENUM('Asia', 'Europe', 'North America', 'Africa', 'Oceania', 'Antarctica', 'South America') NOT NULL DEFAULT 'Asia',
    Region CHAR(26) NOT NULL DEFAULT '',
    SurfaceArea FLOAT(10 , 2 ) NOT NULL DEFAULT '0.00',
    IndepYear SMALLINT(6) DEFAULT NULL,
    Population INT(11) NOT NULL DEFAULT '0',
    LifeExpectancy FLOAT(3 , 1 ) DEFAULT NULL,
    GNP FLOAT(10 , 2 ) DEFAULT NULL,
    GNPOld FLOAT(10 , 2 ) DEFAULT NULL,
    LocalName CHAR(45) NOT NULL DEFAULT '',
    GovernmentForm CHAR(45) NOT NULL DEFAULT '',
    HeadOfState CHAR(60) DEFAULT NULL,
    Capital INT(11) DEFAULT NULL,
    PRIMARY KEY (Code)
);`;

const sqlCreateCity = `CREATE TABLE city (
    ID INT(11) NOT NULL AUTO_INCREMENT,
    Name CHAR(35) NOT NULL DEFAULT '',
    CountryCode CHAR(3) NOT NULL DEFAULT '',
    District CHAR(20) NOT NULL DEFAULT '',
    Population INT(11) NOT NULL DEFAULT '0',
    PRIMARY KEY (ID),
    KEY CountryCode (CountryCode),
    CONSTRAINT city_ibfk_1 FOREIGN KEY (CountryCode)
        REFERENCES country (Code)
);`;

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
