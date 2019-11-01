'use strict';

{
  const { promisify } = require('util');
  const fs = require('fs');
  const mysql = require('mysql');
  const readFile = promisify(fs.readFile);

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
  });

  const executeQuery = promisify(connection.query.bind(connection));

  async function initDatabase() {
    const CREATE_DB = `create database if not exists world`;
    const USE_DB = `use world`;
    const CREATE_COUNTRY_TABLE = `create table if not exists countries ( 
    ID int not null auto_increment primary key,
    Name varchar(254), 
    Continent enum('Asia', 'Africa', 'North America', 'South America', 'Oceania', 'Europe', 'Antarctica'),
    Region varchar(254), 
    SurfaceArea float, 
    IndepYear int,
    Population int,
    LifeExpectancy float,
    GNP float,
    GNPOld float,
    LocalName varchar(254),
    GovernmentForm varchar(254),
    HeadOfState varchar(254),
    Capital int
    )`;
    const CREATE_CITY_TABLE = `create table if not exists cities (
      ID int not null auto_increment primary key,
      Name varchar(254),
      CountryCode varchar(4),
      District varchar(254),
      Population int
      )`;

    connection.connect(error => {
      if (!error) {
        console.log(`Successfully connected to the mysql server.`);
      } else {
        console.error(
          `There was an error connecting to the server: ${error.code} - ${error.message}`,
        );
        // couldn't connect to the mysql server so exit the process.
        process.exit();
      }
    });

    try {
      await executeQuery(CREATE_DB);
      await executeQuery(USE_DB);
      await executeQuery(CREATE_COUNTRY_TABLE);
      await executeQuery(CREATE_CITY_TABLE);
    } catch (error) {
      console.log(`${error.code} - ${error.message}`);
    }
  }

  async function fillTables() {
    try {
      const data = await readFile('data.json', 'utf8');
      const { cities, countries } = JSON.parse(data);

      const cityCount = await executeQuery(`select count(id) as numberOfCities from cities`);
      const isCitiesTableEmpty = cityCount[0].numberOfCities === 0 ? true : false;

      if (isCitiesTableEmpty) {
        cities.forEach(city => {
          connection.query(
            `insert into cities set 
              Name = "${city.name}", 
              CountryCode = "${city.country_code}", 
              District = "${city.district}", 
              Population = ${city.population}`,
            error => {
              if (error) {
                console.error(
                  `There was an error while inserting into cities table: ${error.code} - ${error.message}`,
                );
              }
            },
          );
        });
      }

      const countryCount = await executeQuery(
        `select count(id) as numberOfCountries from countries`,
      );
      const isCountriesTableEmpty = countryCount[0].numberOfCountries === 0 ? true : false;

      if (isCountriesTableEmpty) {
        countries.forEach(country => {
          connection.query(
            `insert into countries set 
              Name = "${country.name}", 
              Continent = "${country.continent}",
              Region = "${country.region}", 
              SurfaceArea = ${country.surface_area}, 
              IndepYear = ${country.indep_year},
              Population = ${country.population},
              LifeExpectancy = ${country.life_expectancy},
              GNP = ${country.gnp},
              GNPOld = ${country.gnp_old},
              LocalName = "${country.local_name}",
              GovernmentForm = "${country.government_form}",
              HeadOfState = "${country.head_of_state}",
              Capital = ${country.capital}`,

            error => {
              if (error) {
                console.error(
                  `There was an error while inserting into countries table: ${error.code} - ${error.message}`,
                );
              }
            },
          );
        });
      }
    } catch (error) {
      console.error(`There was an error: ${error.code} - ${error.message}`);
    }
  }

  async function makeQuery(query) {
    try {
      const result = await executeQuery(query);
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(
        `There was an error while making the query: ${query} \n The error is: ${error}`,
      );
    }
  }

  async function makeQueries() {
    await initDatabase();
    await fillTables();

    // QUERIES

    console.log(`\n The names of the countries with population greater than 8 million \n`);
    await makeQuery(`select name from countries where population > 8000000`);

    console.log(`\n The names of the countries that have “land” in their names \n`);
    await makeQuery(`select name from countries where name like "%land%"`);

    console.log(`\n The names of the cities with population in between 500,000 and 1 million \n`);
    await makeQuery(`select name from cities where population between 500000 and 1000000`);

    console.log(`\n The names of all the countries on the continent ‘Europe’ \n`);
    await makeQuery(`select name from countries where continent = "Europe" order by name`);

    console.log(`\n Countries in the descending order based on their surface areas\n`);
    await makeQuery(`select * from countries order by SurfaceArea desc`);

    console.log(`\n The names of all the cities in the Netherlands \n`);
    await makeQuery(`select name from cities where CountryCode = 'NLD' order by name`);

    console.log(`\n The population of Rotterdam \n`);
    await makeQuery(`select population from cities where name = 'Rotterdam'`);

    console.log(`\nThe top 10 countries based on surface area\n`);
    await makeQuery(`select * from countries order by surfaceArea desc limit 10`);

    console.log(`\nThe top 10 cities with the highest population\n`);
    await makeQuery(`select * from cities order by population desc limit 10`);

    console.log(`\nThe population of the world\n`);
    await makeQuery(`select sum(population) as populationOfTheWorld from countries`);

    connection.end();
  }

  makeQueries();
}
