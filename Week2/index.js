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
    Please first enter the index number of the query, 
    0. For capital city 
    1. Region vs all spoken languages.
    2. Language vs Number of cities.
    3. Language vs Region.
    4. Official Number of Languages vs Continent `);

    const result = await input(['number']);
    const input_number = result.number;

    const select_query = [{
        question: ` \nPlease enter the name of the country as input1 
to find the capital city and leave input 2 blank \n`,
        sql: `SELECT country.name, city.name
        FROM country
        LEFT JOIN city
        ON country.capital = city.id
        WHERE country.name = ?`,
        prompts: ['country'],
      },
      {
        question: `\nPlease enter the name of the region as input1
to list all spoken languages and leave input 2 blank\n`,
        sql: `SELECT countryLanguage.language
        FROM countryLanguage
        LEFT JOIN country
        ON countryLanguage.countryCode = country.Code
        WHERE country.Region = ?;`,
        prompts: ['region']
      },
      {
        question: `\nPlease enter the language as input1 to see the total
number of cities where it is spoken and leave input 2 blank\n`,
        sql: `SELECT COUNT(city.Name) AS sum, countryLanguage.language
          FROM city
          LEFT JOIN countryLanguage
          ON city.countryCode=countryLanguage.countryCode
          WHERE countryLanguage.language=?
          GROUP BY countryLanguage.language;`,
        prompts: ['language']
      },
      {
        question: `\nPlease enter the language as input1 and region as input2 to see which
        countries are speaking that official language in that region\n`,
        sql: `SELECT country.name, countryLanguage.language, country.region
          FROM countryLanguage
          LEFT JOIN country
          ON countryLanguage.countryCode = country.Code
          WHERE countryLanguage.IsOfficial = 'T' HAVING language = ? AND region=?;`,
        prompts: ['language', 'region']
      },
      {
        question: `\nPlease click enter to see the list of the continents with
the number of languages spoken then Enter three times\n`,
        sql: `SELECT country.Continent,
          COUNT(DISTINCT(countryLanguage.language)) AS number_of_languages
          FROM country
          LEFT JOIN countryLanguage
          ON countryLanguage.countryCode = country.Code
          GROUP BY country.Continent;`,
        prompts: []
      },
    ];
    console.log(select_query[input_number]['question']);
    const query = select_query[input_number];
    let values = [];

    const result1 = await input(query.prompts);
    values = Object.values(result1);

    const results = await execQuery(query.sql, values);

    switch (input_number) {
      case '0':
        console.log('Capital city is ' + results[0].name);

        break;
      case '1':
        for (var r in results) console.log(results[r].language);
        break;
      case '2':
        console.log(values + ' language is speaking in ' + results[0].sum + ' cities in the world.');
        break;
      case '3':
        if (results[0] === undefined) {
          console.log('False');
        } else {
          console.log('The following countries speak ' + values[0] + ' in ' + values[1]);
          for (var r in results) console.log('                                                     ' + results[r].name);
        }
        break;
      case '4':
        console.log('Number of language spoken in :')
        for (var r in results) console.log('                              ' + results[r].Continent + ' is ' + results[r].number_of_languages);
        break;
      default:
        console.log('Entry is wrong');
    }
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

queryDatabase();