'use-strict';

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

async function queryDatabase() {
  prompt.start();
  try {
    console.log(`
    Please first enter index number of the query, then
    0. Please enter the name of the country to find the capital city then Enter twice. 
    1. Please enter the name of the region to list all spoken languages then Enter twice.
    2. Please enter the language to see the total number of cities where it is spoken then Enter twice.
    3. Please enter the language then enter, then enter the region then enter to see which
       countries are speaking that official language in that region
    4. Please click enter to see the list of the continents with the number of languages spoken then Enter three times`);

    const result = await input(['number']);
    const input_number = result.number;

    const select_query = [
      `SELECT country.name, city.name 
      FROM country 
      LEFT JOIN city 
      ON country.capital = city.id 
      WHERE country.name = ?; `,
      `SELECT countryLanguage.language, country.region 
      FROM countryLanguage 
      LEFT JOIN country 
      ON countryLanguage.countryCode = country.Code 
      WHERE country.Region = ?;`,
      `SELECT COUNT(city.Name) AS sum, countryLanguage.language 
      FROM city 
      LEFT JOIN countryLanguage 
      ON city.countryCode=countryLanguage.countryCode 
      WHERE countryLanguage.language=? 
      GROUP BY countryLanguage.language;`,
      `SELECT country.name, countryLanguage.language, country.region 
      FROM countryLanguage 
      LEFT JOIN country 
      ON countryLanguage.countryCode = country.Code 
      WHERE countryLanguage.IsOfficial = 'T' HAVING language = ? AND region=?;`,
      `SELECT country.Continent, 
      COUNT(countryLanguage.language) AS number_of_languages 
      FROM country 
      LEFT JOIN countryLanguage 
      ON countryLanguage.countryCode = country.Code 
      GROUP BY country.Continent;`,
    ];

    const result1 = await input(['number1', 'number2']);
    const entry = [result1.number1, result1.number2];

    const results = await execQuery(select_query[input_number], entry);
    console.log(results);
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

queryDatabase();