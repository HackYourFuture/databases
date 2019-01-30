'use strict';

const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function answerQuestions() {
  connection.connect();

  try {
    // 1. What are the names of countries with population greater than 8 million?
    const query1 = await execQuery(
      'select name, population from countries where population > 8000000',
    );
    //console.log(query1);

    // 2. What are the names of countries that have “land” in their names ?
    const query2 = await execQuery('select name from countries where name like "%land%"');
    //console.log(query2);

    // 3. What are the names of the cities with population in between 500,000 and 1 million ?
    const query3 = await execQuery(
      'select name, population from cities where population >= 500000 and population <= 1000000',
    );
    //console.log(query3);

    // 4. What's the name of all the countries on the continent ‘Europe’ ?
    const query4 = await execQuery(
      'select name, continent from countries where continent = "Europe"',
    );
    //console.log(query4);

    // 5. List all the countries in the descending order of their surface areas.
    const query5 = await execQuery(
      'select name, surface_area from countries order by surface_area desc',
    );
    //console.log(query5);

    // 6. What are the names of all the cities in the Netherlands?
    const query6 = await execQuery(
      'select name, country from cities where country = "The_Netherlands"',
    );
    //console.log(query6);

    // 7. What is the population of Rotterdam ?
    const query7 = await execQuery(
      'select population as "Population of Rotterdam" from cities where name = "Rotterdam"',
    );
    //console.log(query7);

    // 8. What's the top 10 countries by Surface Area ?
    const query8 = await execQuery(
      'select name, surface_area from countries order by surface_area desc limit 10',
    );
    //console.log(query8);

    // 9. What's the top 10 most populated cities?
    const query9 = await execQuery(
      'select name, population from cities order by population desc limit 10',
    );
    //console.log(query9);

    // 10. What is the population of the world ?
    const query10 = await execQuery(
      'select sum(population) as "population of the world" from countries',
    );
    // console.log(query10);
  } catch (err) {
    console.error(err);
  }

  connection.end();
}

answerQuestions();
