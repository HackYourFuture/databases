const fs = require('fs');
const { promisify } = require('util');
const mysql = require('mysql');
const readFilePromisify = promisify(fs.readFile);

const filePath = './data.json';
const defaultEncoding = 'utf-8';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootuser',
});

const execQuery = promisify(connection.query.bind(connection));

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

    // answers of question 4
    const answer4_1 = await execQuery(
      `select name,population from countries where population > 8000000;`,
    );
    console.log('ANSWER OF QUESTION 4.1 :');
    console.table(answer4_1);
    const answer4_2 = await execQuery(
      `select name from countries where name like '%land%';`,
    );
    console.log('ANSWER OF QUESTION 4.2 :');
    console.table(answer4_2);
    const answer4_3 = await execQuery(
      `select name,population from cities where population >500000 and population < 1000000;`,
    );
    console.log('ANSWER OF QUESTION 4.3 :');
    console.table(answer4_3);
    const answer4_4 = await execQuery(
      `select name from countries where continent = 'Europe';`,
    );
    console.log('ANSWER OF QUESTION 4.4 :');
    console.table(answer4_4);
    const answer4_5 = await execQuery(`select * from countries order by surface_area desc;
    `);
    console.log('ANSWER OF QUESTION 4.5 :');
    console.table(answer4_5);

    // answers of question 5
    const answer5_1 = await execQuery(
      `select name,population from cities where country_code='NLD';`,
    );
    console.log('ANSWER OF QUESTION 5.1 :');
    console.table(answer5_1);
    const answer5_2 = await execQuery(
      `select name,population from cities where name='Rotterdam';`,
    );
    console.log('ANSWER OF QUESTION 5.2 :');
    console.table(answer5_2);
    const answer5_3 = await execQuery(
      `select name,surface_area from countries order by surface_area desc limit 10;`,
    );
    console.log('ANSWER OF QUESTION 5.3 :');
    console.table(answer5_3);
    const answer5_4 = await execQuery(
      `select name,population from cities order by population desc limit 10;`,
    );
    console.log('ANSWER OF QUESTION 5.4:');
    console.table(answer5_4);
    const answer5_5 = await execQuery(
      `select sum(population) as world_population from countries;`,
    );
    console.log('ANSWER OF QUESTION 5.5 :');
    console.table(answer5_5);
  } catch (error) {
    console.error(error);
  }

  connection.end();
}
seedDatabase();
