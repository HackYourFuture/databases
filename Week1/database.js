'use strict'

let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world'
});

let database = 'create database IF NOT EXISTS new_world';
let useDatabase = 'use new_world';

let tableCountry = ` CREATE TABLE IF NOT EXISTS country(
    name CHAR(20),
    population INT,
    ends_land CHAR(20),
    CountryCode CHAR(3) NOT NULL DEFAULT
    continent CHAR(7),
    surfaceArea INT,
    world_population INT
    )`;

let tableCity = ` CREATE TABLE IF NOT EXISTS city(
      name CHAR(20),
      population INT
      )`;

connection.connect();

let createQuery = [database, useDatabase, tableCountry, tableCity ];
  for(let i =0; i < createQuery.length; i++) {
    connection.query(createQuery[i], function (error, results) {
      if (error) {
          throw error;
        }
        console.log(results);
  });
}

let selectQueries = [
      `select * from country where population > 8000000;`,
      `select * from country where name LIKE '%land%';`,
      `select * from city where population > 500000 and population < 1000000;`,
      `select * from country where continent='Europe';`,
      `select * from country order by surfaceArea DESC;`,
      `select * from city where countrycode = 'NLD';`,
      `select population from city where name = 'Rotterdam';`,
      `select name from country order by surfaceArea desc limit 10;`,
      `select name from city order by population DESC limit 10;`,
      `select sum(population) from country;`,
];

let insertQueries = [
  `The names of the coutries where population is greater than 8 million are:`,
  `The names of the countries with word 'land' in it:`,
  `The names of the cities where the population is between 500,000 and 1000000: `,
  `The names of the countries on Europe's continent are: `,
  `A list all countries in the descending order based on their surface areas: `,
  `The names of all the cities in the Netherlands are: `,
  `The population of Rotterdam is: `,
  `The top 10 countries based on surface area are: `,
  `The top 10 cities with the highest population are: `,
  `The population of the world is: `
]

 for(let i = 0; i < selectQueries.length; i++){
   connection.query(selectQueries[i], function (error, results) {
        if (error) {
            throw error;
         }
     console.log(insertQueries[i] + '\n' , results);
     });
}

connection.end();
