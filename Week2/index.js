'use-strict';

const prompt = require('prompt');
const util = require('util');
const mysql = require('mysq
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
            question: ` \nPlease enter the name of the country 
to find the capital\n`,
            sql: `SELECT country.name, city.name
        FROM country
        LEFT JOIN city
        ON country.capital = city.id
        WHERE country.name = ?`,
            prompts: ['country'],
          },
          {
            question: `\nPlease enter the name of the region
to list all spoken languages\n`,
            sql: `SELECT countryLanguage.language
        FROM countryLanguage
        LEFT JOIN country
        ON countryLanguage.countryCode = country.Code
        WHERE country.Region = ?;`,
            prompts: ['region'],
          },
          {
            question: `\nPlease enter the language to see the total
number of cities where it is spoken\n`,
            sql: `SELECT COUNT(city.Name) AS sum, countryLanguage.language
          FROM city
          LEFT JOIN countryLanguage
          ON city.countryCode=countryLanguage.countryCode
          WHERE countryLanguage.language=?
          GROUP BY countryLanguage.language;`,
            prompts: ['language'],
          },
          {
            question: `\nPlease enter the language and region to see which
countries are speaking that official language in that region\n`,
            sql: `SELECT country.name, countryLanguage.language, country.region
          FROM countryLanguage
          LEFT JOIN country
          ON countryLanguage.countryCode = country.Code
          WHERE countryLanguage.IsOfficial = 'T' 
          HAVING language = ? AND region=?;`,
            prompts: ['language', 'region'],
          },
          {
            question: ``,
            sql: `SELECT country.Continent,
          COUNT(DISTINCT(countryLanguage.language)) AS number_of_languages
          FROM country
          LEFT JOIN countryLanguage
          ON countryLanguage.countryCode = country.Code
          GROUP BY country.Continent;`,
            prompts: [],
          },
        ];
        console.log(select_query[input_number]['question']);
        const query = select_query[input_number];
        let values = [];

        const result1 = await input(query.prompts);
        values = Object.values(result1);

        const results = await execQuery(query.sql, values);
        const tab8 = '                           ';
        switch (input_number) {
          case '0':
            console.log('Capital city is ' + results[0].name + '.');

            break;
          case '1':
            console.log('\nThe following languages are spoken in ' + values + '\n');
            for (var r in results) console.log(results[r].language);
            break;
          case '2':
            console.log(
              '\n' + values + ' language is spoken by ' + results[0].sum + ' cities in the world.\n',
            );
            break;
          case '3':
            if (results[0] === undefined) {
              console.log('False');
            } else {
              console.log('\nThe following countries speak ' + values[0] + ' in ' + values[1]);
              for (var r in results) console.log(tab8 + tab8 + results[r].name);
              console.log('\n');
            }
            break;
          case '4':
            console.log('Number of languages spoken in :');
            for (var r in results)
              console.log(tab8 + results[r].Continent + ' is ' + results[r].number_of_languages);
            console.log('\n');
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