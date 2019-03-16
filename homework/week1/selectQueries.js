const mysql = require('mysql');
const util = require('util');
const { config, configWithDb } = require('./connection.js');

const connection = mysql.createConnection(configWithDb);

const execQuery = util.promisify(connection.query.bind(connection));

const queries = [
  [
    '1. What are the names of countries with population greater than 8 million',
    'SELECT country_name FROM countries WHERE population > 8000000;',
  ],
  [
    '2. What are the names of countries that have “land” in their names ?',
    `SELECT country_name FROM countries WHERE country_name LIKE '%land%';`,
  ],
  [
    '3. What are the names of the cities with population in between 500, 000 and 1 million ?',
    `SELECT city_name FROM cities WHERE population BETWEEN 500000 AND 1000000;`,
  ],
  [
    `4. What's the name of all the countries on the continent ‘Europe’ ?`,
    `SELECT country_name FROM countries WHERE continent= 'europe';`,
  ],
  [
    '5. List all the countries in the descending order of their surface areas.',
    `SELECT country_name, surface_area FROM countries ORDER BY surface_area DESC;`,
  ],
  [
    '6. What are the names of all the cities in the Netherlands ?',
    `SELECT A.city_name FROM cities A JOIN countries B ON A.country_code = B.country_code WHERE B.country_name = 'Netherlands'`,
  ],
  [
    '7. What is the population of Rotterdam ?',
    `SELECT population FROM cities WHERE city_name = 'Rotterdam';`,
  ],
  [
    `8. What's the top 10 countries by Surface Area ?`,
    `SELECT country_name, surface_area FROM countries ORDER BY surface_area DESC LIMIT 10;`,
  ],
  [
    `9. What's the top 10 most populated cities?`,
    `SELECT city_name, population FROM cities ORDER BY population DESC LIMIT 10;`,
  ],
  [
    '10. What is the population of the world ?',
    `SELECT SUM(population) AS world_population FROM countries;`,
  ],
];

connection.connect();

async function main() {
  try {
    queries.forEach(async query => {
      await execQuery(query[1], (error, result) => {
        if (error) {
          throw error;
        }

        console.log(`${query[0]} \nSQL: ${query[1]}\nResults:\n`);
        if (result.length > 0) {
          console.log(Object.keys(result[0]).join('\t\t'));

          result.forEach(element => {
            let row = [];
            for (let key of Object.keys(element)) {
              row.push(element[key]);
            }
            console.log(row.join('\t\t'));
          });
          console.log('\n');
        } else {
          console.log('No results\n');
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
  connection.end();
}

module.exports = main;
