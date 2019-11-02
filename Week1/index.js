const fs = require('fs');
const { promisify } = require('util');
const mysql = require('mysql');
const readFilePromisify = promisify(fs.readFile);

const filePath = './data.json';
const defaultEncoding = 'utf-8';

const createHelpOptions = () => {
  console.log(`Usage: node index.js [options]

Options:

1          shows answer of "What are the names of the countries 
                             with population greater than 8 million?"
2          shows answer of "What are the names of the countries 
                             that have “land” in their names ?"
3          shows answer of "What are the names of the cities with
                             population in between 500,000 and 1 million ?"
4          shows answer of "What are the names of all the countries
                             on the continent ‘Europe’ ?"
5          shows answer of List all the countries in the descending order
                             based on their surface areas.        
6          shows answer of "What are the names of all the cities in the
                             Netherlands?"
7          shows answer of "What's the population of Rotterdam?"
8          shows answer of "What's the top 10 countries based on surface area?"
9          shows answer of "What's the top 10 cities with the highest population?"
10         shows answer of "What's the population of the world ?"
  `);
};

const queries = [
  {
    query: `select name,population from countries where population > 8000000;`,
    question: 1,
  },
  {
    query: `select name from countries where name like '%land%';`,
    question: 2,
  },
  {
    query: `select name,population from cities where population >500000 and population < 1000000;`,
    question: 3,
  },
  {
    query: `select name from countries where continent = 'Europe';`,
    question: 4,
  },
  {
    query: `select * from countries order by surface_area desc;`,
    question: 5,
  },
  {
    query: `select name,population from cities where country_code='NLD';`,
    question: 6,
  },
  {
    query: `select name,population from cities where name='Rotterdam';`,
    question: 7,
  },
  {
    query: `select name,surface_area from countries order by surface_area desc limit 10;`,
    question: 8,
  },
  {
    query: `select name,population from cities order by population desc limit 10;`,
    question: 9,
  },
  {
    query: `select sum(population) as world_population from countries;`,
    question: 10,
  },
];

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootuser',
});

const execQuery = promisify(connection.query.bind(connection));

const consoleQuery = async question => {
  queries.filter(query => {
    if (query.question === question) {
      console.log(`ANSWER OF QUESTION ${query.question} :`);
      return execQuery(query.query).then(console.table);
    }
  });
};

async function seedDatabase() {
  const DELETE_DATABASE = `DROP DATABASE IF EXISTS WORLD;`;
  const CREATE_DATABASE_WORLD = `CREATE DATABASE IF NOT EXISTS world;`;
  const USE_DATABASE_WORLD = `use world;`;
  const CREATE_CITIES_TABLE = `
  CREATE TABLE IF NOT EXISTS cities (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(254),
    country_code VARCHAR(3),
    district VARCHAR(254),
    population INT,
    PRIMARY KEY (id)
    );`;
  const CREATE_COUNTRIES_TABLE = `
    CREATE TABLE IF NOT EXISTS countries (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(254),
      continent enum('Asia', 'Africa', 'North America', 'South America', 'Oceania', 'Europe', 'Antarctica'),
      region VARCHAR(254),
      surface_area FLOAT,
      indep_year INT,
      population INT,
      life_expectancy FLOAT,
      gnp FLOAT,
      gnp_old FLOAT,
      local_name VARCHAR(254),
      government_form VARCHAR(254),
      head_of_state VARCHAR(254),
      capital INT,
      PRIMARY KEY (id)
      );`;

  connection.connect();

  try {
    // answers of question 1-3
    await execQuery(DELETE_DATABASE);
    await execQuery(CREATE_DATABASE_WORLD);
    await execQuery(USE_DATABASE_WORLD);
    await execQuery(CREATE_CITIES_TABLE);
    await execQuery(CREATE_COUNTRIES_TABLE);
    const { cities, countries } = JSON.parse(
      await readFilePromisify(filePath, defaultEncoding),
    );
    cities.forEach(async city => {
      try {
        await execQuery(
          `INSERT INTO cities SET name= '${city.name}', country_code= '${city.country_code}',
            district= '${city.district}', population= ${city.population}`,
          city,
        );
      } catch (error) {
        console.log(error);
      }
    });

    countries.forEach(async country => {
      try {
        await execQuery(
          `INSERT INTO countries SET name= "${country.name}", continent= "${country.continent}",
              region= "${country.region}", surface_area= ${country.surface_area},
              indep_year= ${country.indep_year}, population= ${country.population},
              life_expectancy= ${country.life_expectancy}, gnp= ${country.gnp},
              gnp_old= ${country.gnp_old}, local_name= "${country.local_name}",
              government_form= "${country.government_form}" , head_of_state= "${country.head_of_state}",
              capital= ${country.capital}`,
          country,
        );
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.error(error);
  }

  const [, , ...questions] = process.argv;

  switch (questions[0]) {
    case '1':
      consoleQuery(parseInt(questions[0], 10));
      break;
    case '2':
      consoleQuery(parseInt(questions[0], 10));
      break;
    case '3':
      consoleQuery(parseInt(questions[0], 10));
      break;
    case '4':
      consoleQuery(parseInt(questions[0], 10));
      break;
    case '5':
      consoleQuery(parseInt(questions[0], 10));
      break;
    case '6':
      consoleQuery(parseInt(questions[0], 10));
      break;
    case '7':
      consoleQuery(parseInt(questions[0], 10));
      break;
    case '8':
      consoleQuery(parseInt(questions[0], 10));
      break;
    case '9':
      consoleQuery(parseInt(questions[0], 10));
      break;
    case '10':
      consoleQuery(parseInt(questions[0], 10));
      break;
    default:
      createHelpOptions();
      break;
  }

  connection.end();
}
seedDatabase();
