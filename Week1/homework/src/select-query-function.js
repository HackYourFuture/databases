'use-strict';
const util = require('util');
const mysql = require('mysql');
const prompt = require('prompt');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function select_function(select_query, consoleMessage, column) {
  connection.connect();
  try {
    const result = await execQuery(select_query);

    console.log(consoleMessage);
    for (let i = 0; i < result.length; i++) {
      console.log(`-- ${result[i][column].toLocaleString('en')}`);
    }
  } catch (error) {
    console.error(new Error(`this is error message : ${error}`));
  }
  connection.end();
}

prompt.start();
prompt.get(['query_Number'], async function (Null, result) {
  try {
    switch (result.query_Number) {
      case '1':
        await select_function(
          `SELECT name FROM country where population > 8;`,
          'Countries with population more than 8 million.',
          'name',
        );
        break;
      case '2':
        await select_function(
          `SELECT name FROM country WHERE name like '%land%';`,
          'countries that have "land" in their names',
          'name',
        );
        break;
      case '3':
        await select_function(
          `SELECT name FROM city WHERE (population BETWEEN 500000 AND 1000000);`,
          'cities with population in between 500,000 and 1 million',
          'name',
        );
        break;
      case '4':
        await select_function(
          `SELECT name FROM country WHERE continent = 'Europe';`,
          ' countries in the continent ‘Europe’ ',
          'name',
        );
        break;
      case '5':
        await select_function(
          `SELECT name FROM country ORDER BY surface_area DESC;`,
          ' countries in the descending order of their surface areas',
          'name',
        );
        break;
      case '6':
        await select_function(
          `SELECT name from city where country ='Netherlands';`,
          'cities in the Netherlands',
          'name',
        );
        break;
      case '7':
        await select_function(
          `SELECT population FROM city WHERE name ='Rotterdam';`,
          'population of Rotterdam :',
          'population',
        );
        break;
      case '8':
        await select_function(
          `SELECT name from  country ORDER BY surface_area DESC LIMIT 10;`,
          ' Top countries by their surface areas',
          'name',
        );
        break;
      case '9':
        await select_function(
          `SELECT name FROM  city ORDER BY population DESC LIMIT 10;`,
          ' most populated cities.',
          'name',
        );
        break;
      case '10':
        await select_function(
          ` SELECT SUM(population) from country;`,
          'population of the World :',
          'SUM(population)',
        );
        break;

      default:
        throw error;
        break;
    }
  } catch (error) {
    console.error('please enter a valid input: you can only enter from 1- 10 numbers');
  }
});