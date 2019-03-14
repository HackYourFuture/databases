'use strict';

const printHelp = () => {
  console.log(`
HackYourFuture databases Week 1 Homework

Usage:

1) Create the data bases and tables by running 'node create-database-tables.js'
2) Seed the countries table by running 'node countries.js'
3) Seed the cities table by running 'node cities.js'
4) You can know get the results by running 'node index.js [options]'

Options:

  1..........Countries with population greater than 8 million
  2..........Countries that have “land” in their names
  3..........Cities with population in between 500,000 and 1 million
  4..........Countries on the continent ‘Europe’
  5..........Countries in the descending order of their surface areas
  6..........Names of all the cities in the Netherlands
  7..........Population of Rotterdam
  8..........Top 10 countries by surface area
  9..........Top 10 most populated cities
  10.........Population of the world
  help.......Show this help text
  `);
};

module.exports = { printHelp };
