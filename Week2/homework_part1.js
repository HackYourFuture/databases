const prompt = require('prompt');
const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

const questionQuide = `Please select a question:
      1 - What is the capital of country X ?,
      2 - List all the languages spoken in the region Y,
      3 - Find the number of cities in which language Z is spoken,
      4 - Are there any countries in this region with the given language as the official language ?,
      5 - List all the continents with the number of languages spoken in each continent
      Write a rotation number of the question like 1,2,3..`;

const select_query = [
  `SELECT city.name FROM country JOIN city on city.ID = country.capital WHERE country.name = ?;`,
  `SELECT countrylanguage.language FROM countrylanguage JOIN country ON country.code = countrycode WHERE country.region = ?;`,
  `SELECT COUNT(city.name) FROM city JOIN countrylanguage ON city.countrycode = countrylanguage.countrycode WHERE countrylanguage.language = ?;`,
  `SELECT country.name, country.region, countrylanguage.language FROM country JOIN countrylanguage ON code = countrylanguage.countrycode GROUP BY country.region, countrylanguage.language, country.name, countrylanguage.IsOfficial HAVING countrylanguage.IsOfficial = 'T' AND country.region = ? AND countrylanguage.language = ?;`,
  `SELECT country.continent, COUNT(DISTINCT countrylanguage.Language) AS language_number FROM countrylanguage JOIN country ON country.code = countrycode GROUP BY country.continent`,
];
const conditions = ['Country name', 'Region', 'Language'];

const selectQuery = async index => {
  if (index === 5) {
    const results = await execQuery(select_query[index - 1]);
    console.log(results);
  } else if (index === 4) {
    const inputCondition = await input([conditions[1], conditions[2]]);
    const inputData = [inputCondition[conditions[1]], inputCondition[conditions[2]]];
    const results = await execQuery(select_query[index - 1], inputData);
    if (results == 0) {
      console.log(false);
    } else {
      console.log(results);
    }
  } else {
    const inputCondition = await input([conditions[index - 1]]);
    const inputData = inputCondition[conditions[index - 1]];
    const results = await execQuery(select_query[index - 1], inputData);
    console.log(results);
  }
};

async function queryDatabase() {
  prompt.start();
  try {
    console.log(questionQuide);
    const inputQuestion = await input(['question']);
    const i = parseInt(inputQuestion.question);
    if (i > 0 && i < 6) {
      await selectQuery(i);
    } else {
      console.log('Please enter a valid number !');
    }
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

queryDatabase();
