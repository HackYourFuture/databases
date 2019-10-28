const mysql = require('mysql');
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

// Prepare connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
});

const asyncQuery = promisify(connection.query.bind(connection));

// Queries in order, to be executed
const queries = [
  { query: 'create database if not exists world', message: 'Database "world" created.' }, // createDB
  { query: 'use world', message: 'Database "world" selected.' }, // select the database
  {
    query: `create table if not exists city
                    (
                      id int not null auto_increment,
                      name varchar(254) not null,
                      country_code varchar(3),
                      district varchar(254),
                      population int,
                      primary key(id)
                    )`,
    message: '"city" table created.',
  }, // createTableCity
  {
    query: `create table if not exists country
                      (
                        id int not null auto_increment,
                        name varchar(254) not null,
                        continent enum('Asia', 'Africa', 'North America', 'South America', 'Oceania', 'Europe', 'Antarctica'),
                        region varchar(254),
                        surface_area float,
                        indep_year int,
                        population int,
                        life_expectancy float,
                        gnp float,
                        gnp_old float,
                        local_name varchar(254),
                        government_form varchar(254),
                        head_of_state varchar(254),
                        capital int,
                        primary key(id),
                        foreign key(capital) references city(id)
                      )`,
    message: '"country" table created.',
  }, // createTableCountry
];

function showErrorAndExit(errorMessage, connection) {
  console.error(errorMessage);
  if (connection) connection.end();
  process.exit();
}

// Make the connection to the mysql server
connection.connect(err => {
  if (err) {
    showErrorAndExit(`Connection Error: ${err.message} (${err.code})`);
  }
  console.log('Successfully connected to mysql server...');
});

async function createDBAndTables() {
  for (const query of queries) {
    try {
      await asyncQuery(query.query);
      console.log(query.message);
    } catch (err) {
      if (err) {
        showErrorAndExit(`Query Error: ${err.message} (${err.code})`, connection);
      }
    }
  }
}

async function insertRecord(records, table) {
  try {
    for (const record of records) {
      await asyncQuery('insert into ' + table + ' SET ?', record);
      /**
       * To increase user experience;
       * Just logs the same line :: \033[0G => \r
       * console.log creates new line
       * so process.stdout.write() with '\033[0G' code at the end makes sense for this purpose.
       */
      process.stdout.write('Adding into ' + table + ' table. \033[0G');
    }
    console.log(`Records added successfully into ${table} table.`);
  } catch (err) {
    if (err) {
      showErrorAndExit(`Query Error: ${err.message} (${err.code})`, connection);
    }
  }
}

// Populate tables with related data
async function readAndInsertDataIntoTables() {
  try {
    // Read & Parse Data
    const { cities, countries } = JSON.parse(await readFile('./data.json', 'utf-8'));

    // Insert each city record to the city table
    await insertRecord(cities, 'city');

    // Insert each country record to the country table
    await insertRecord(countries, 'country');

    // Before exit, close the connection
    connection.end();
  } catch (error) {
    showErrorAndExit(`File Read Error: ${error.message}`, connection);
  }
}

async function queryAndShowResultOf(filter, table, fields) {
  const query = `select ${
    fields.length > 1 ? fields.join(',') : fields[0]
  } from ${table} ${filter}`;
  try {
    const result = await asyncQuery(query);
    console.log('\n\nResult of ', filter, '\n');
    console.table(result);
  } catch (err) {
    showErrorAndExit(`Filtering Error on (${filter}): ${err.message}`, connection);
  }
}

/**
 * Just to prevent duplicates
 * At first run it should be 'false'
 * Then it must be 'true' for the purpose
 */
const isTablePopulatedBefore = false;

async function main() {
  // Questions 1 - 3
  await createDBAndTables();
  if (!isTablePopulatedBefore) await readAndInsertDataIntoTables();

  // Question 4
  // 1 - names of the countries with population greater than 8 million
  await queryAndShowResultOf('where population > 8000000', 'country', ['name']);
  // 2 - names of the countries that have “land” in their names
  await queryAndShowResultOf(`where name like '%land%'`, 'country', ['name']);
  // 3 - names of the cities with population in between 500,000 and 1 million
  await queryAndShowResultOf('where population between 500000 and 1000000', 'city', ['name']);
  // 4 - names of all the countries on the continent ‘Europe’
  await queryAndShowResultOf(`where continent = 'Europe'`, 'country', ['name']);
  // 5 - all the countries in the descending order based on their surface areas
  await queryAndShowResultOf(`order by surface_area desc`, 'country', ['*']);

  // Question 5 => Optionals
  // 1- names of all the cities in the Netherlands?
  await queryAndShowResultOf(`where country_code = 'NLD'`, 'city', ['*']);
  // 2 - population of Rotterdam
  await queryAndShowResultOf(`where name = 'Rotterdam'`, 'city', ['population']);
  // 3 - top 10 countries based on surface area
  await queryAndShowResultOf(`order by surface_area desc limit 10`, 'country', ['*']);
  // 4 - top 10 cities with the highest population
  await queryAndShowResultOf(`order by population desc limit 10`, 'city', ['*']);
  // 5 - population of the world
  await queryAndShowResultOf('', 'country', ['sum(population) as world_population']);
  if (isTablePopulatedBefore) connection.end();
}

main();
