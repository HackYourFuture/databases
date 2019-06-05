'use-strict';

const queryAndLog = {
  createDb: 'CREATE DATABASE IF NOT EXISTS world',
  logDb: 'Database "world is created successfully!',
  useDb: 'USE world',
  logUse: 'Database "world" is being used!',
  createCountriesTable: `CREATE TABLE IF NOT EXISTS countries (
  No INT,
  name LONGTEXT,
  region TEXT,
  population INT,
  area INT
  );`,
  logCCT: 'countries table is created successfully!',
  createCitiesTable: `
CREATE TABLE IF NOT EXISTS cities (
  No INT,
  name LONGTEXT,
  population INT,
  country TEXT
  );`,
  logCCityT: 'cities table is created successfully!',
  deleteCountriesTable: `DELETE FROM countries`,
  logDCT: 'countries table is deleted successfully!',
  deleteCitiesTable: `DELETE FROM cities`,
  logDCityT: 'cities table is deleted successfully!',
  passCitiesData: 'INSERT INTO cities SET no=?, name=?, population=?, country=?',
  logPassCityD: `City information are added to the "cities" table successfully!`,
  passCountriesData: 'INSERT INTO countries SET no=?, name=?, region=?, population=?, area=?',
  logPassCCD: `Country information are added to the "countries" table successfully!`,
  one: 'SELECT name, population FROM countries WHERE population > 8000000',
  log1: `1- Countries with population greater than 8 million:`,
  two: 'SELECT name FROM countries WHERE name LIKE "%land%"',
  log2: `2- Countries that have “land” in their names:`,
  three: 'SELECT name, population FROM cities WHERE population BETWEEN 500000 AND 1000000',
  log3: `3- Cities with population in between 500,000 and 1 million:`,
  four: 'SELECT name, region FROM countries WHERE region = "Europe"',
  log4: `4- Countries on the continent ‘Europe’:`,
  five: 'SELECT name, area FROM countries ORDER BY area DESC',
  log5: `5- Countries in the descending order of their surface areas:`,
  six: 'SELECT name  FROM cities WHERE country ="Netherlands"',
  log6: `6- Names of all the cities in the Netherlands:`,
  seven: 'SELECT name, population  FROM cities WHERE name ="Rotterdam"',
  log7: `7- Population of Rotterdam:`,
  eight: 'SELECT name, area FROM countries ORDER BY area DESC LIMIT 10',
  log8: `8- Top 10 countries by surface area:`,
  nine: 'SELECT name, population FROM cities ORDER BY population DESC LIMIT 10',
  log9: `9- Top 10 most populated cities:`,
  ten: 'SELECT  SUM (population) AS populationOfTheWorld FROM countries',
  log10: `10- Population of the world:`,
  help: `
HackYourFuture databases Week 1 Homework
Usage:
 You can use the App by running 'node index.js [options]'
Options:
  create.....................Create the data bases and tables
  passCountriesData..........Seed the countries table
  passCitiesData.............Seed the cities table
  deleteCountriesTable.......Clear the countries table
  deleteCitiesTable..........Clear the cities table
  1..........................Countries with population greater than 8 million
  2..........................Countries that have “land” in their names
  3..........................Cities with population in between 500,000 and 1 million
  4..........................Countries on the continent ‘Europe’
  5..........................Countries in the descending order of their surface areas
  6..........................Names of all the cities in the Netherlands
  7..........................Population of Rotterdam
  8..........................Top 10 countries by surface area
  9..........................Top 10 most populated cities
  10.........................Population of the world
  help.......................Show this help text
  `,
};

const {
  passCitiesData,
  logPassCityD,
  passCountriesData,
  logPassCCD,
  createDb,
  logDb,
  useDb,
  logUse,
  createCountriesTable,
  logCCT,
  createCitiesTable,
  logCCityT,
  deleteCountriesTable,
  logDCT,
  deleteCitiesTable,
  logDCityT,
  one,
  log1,
  two,
  log2,
  three,
  log3,
  four,
  log4,
  five,
  log5,
  six,
  log6,
  seven,
  log7,
  eight,
  log8,
  nine,
  log9,
  ten,
  log10,
  help,
} = queryAndLog;
const query = [one, two, three, four, five, six, seven, eight, nine, ten];
const log = [log1, log2, log3, log4, log5, log6, log7, log8, log9, log10];

module.exports = {
  query,
  log,
  passCitiesData,
  logPassCityD,
  passCountriesData,
  logPassCCD,
  createDb,
  logDb,
  useDb,
  logUse,
  createCountriesTable,
  logCCT,
  createCitiesTable,
  logCCityT,
  deleteCountriesTable,
  logDCT,
  deleteCitiesTable,
  logDCityT,
  help,
};
