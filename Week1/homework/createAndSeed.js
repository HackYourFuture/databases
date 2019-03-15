'use strict';

// REQUIRING SECTION
const util = require('util');
const { DATABASE_WORLD, COUNTRIES_TABLE, CITIES_TABLE } = require('./databaseAndTables');
const { countries, cities } = require('./world_database');
const connection = require('./connection');

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();
  try {
    await execQuery(DATABASE_WORLD);
    await execQuery(COUNTRIES_TABLE);
    await execQuery(CITIES_TABLE);

    countries.forEach(async country => {
      await execQuery(`INSERT INTO countries SET ?`, country);
      if (countries.indexOf(country) === countries.length - 1)
        console.log(`countries have been added...`);
    });

    cities.forEach(async city => {
      await execQuery(`INSERT INTO cities SET ?`, city);
      if (cities.indexOf(city) === cities.length - 1) console.log(`cities have been added...`);
    });
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
