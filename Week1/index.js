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

// Make the connection to the mysql server
connection.connect(err => {
  if (err) {
    console.error(`Connection Error: ${err.message} (${err.code})`);
    process.exit();
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
        console.error(`Query Error: ${err.message} (${err.code})`);
        connection.end();
        process.exit();
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
      console.error(`Query Error: ${err.message} (${err.code})`);
      connection.end();
      process.exit();
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
    console.error(`File Read Error: ${error.message}`);
    connection.end();
    process.exit();
  }
}

async function main() {
  await createDBAndTables();
  await readAndInsertDataIntoTables();
}

main();
