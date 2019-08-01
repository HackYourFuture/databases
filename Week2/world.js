'use strict';
const mysql = require('mysql');
const prompt = require('prompt');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});
const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));
function printInfo() {
  console.log(
    '\n\nType the number of the query  and press enter. type "exit" to quit.\n\nQueries  :\n\n' +
      '(1) What is the capital of ...?\n(2) Which languages are spoken in region ...?\n(3) How many cities speak ... language?\n' +
      '(4) Which countries in region ..., language ... is the official language?\n(5) Continents with the number of languages spoken in each continent\n',
  );
}
const promptValues = [
  { name: 'query', validator: /^[1-5]+$/, warning: 'Query numbers must be 1 to 5' },
  {
    name: 'country',
    required: true,
    ask: function() {
      return prompt.history('query').value == 1;
    },
  },
  {
    name: 'region',
    type: 'string',
    required: true,
    ask: function() {
      return prompt.history('query').value == 2 || prompt.history('query').value == 4;
    },
  },
  {
    name: 'language',
    type: 'string',
    required: true,
    ask: function() {
      return prompt.history('query').value == 3 || prompt.history('query').value == 4;
    },
  },
];

function createJoin(column1, column2, table1, table2, onColumn1, onColumn2, value1, value2) {
  let sql = ' select distinct ??, ?? from ?? left join ?? on ?? = ?? where ?? = ?';
  const inserts = [column1, column2, table1, table2, onColumn1, onColumn2, value1, value2];
  sql = mysql.format(sql, inserts);
  return sql;
}

function createQueryFour(language, region) {
  let sql =
    "select country.Name, countrylanguage.language, countrylanguage.isOfficial from countrylanguage left join country on country.Code =countrylanguage.CountryCode where country.Region = ? and countrylanguage.language = ? and countrylanguage.isofficial = 'T'";
  const inserts = [region, language];
  sql = mysql.format(sql, inserts);
  return sql;
}
function createQueryFive() {
  let sql =
    'select country.continent, count(distinct(countrylanguage.language)) as count from country left join countrylanguage on country.code = countrylanguage.countryCode group by country.continent';

  return sql;
}
async function getPromptInputs() {
  printInfo();
  prompt.start();
  const selection = await input(promptValues);

  return selection;
}

async function main() {
  try {
    const { query, country, region, language } = await getPromptInputs();
    switch (query) {
      case '1':
        const capital = await execQuery(
          await createJoin(
            'country.Name',
            'city.Name',
            'city',
            'country',
            'country.Capital',
            'city.ID',
            'country.Name',
            country,
          ),
        );

        console.log('The capital of ', country, ' is ', capital[0].Name);
        break;
      case '2':
        const countries = await execQuery(
          await createJoin(
            'Country.Region',
            'countrylanguage.language',
            'countrylanguage',
            'country',
            'country.Code',
            'countrylanguage.CountryCode',
            'country.Region',
            region,
          ),
        );
        console.log(`Languages spoken in ${region} are  :`);
        countries.map(country => console.log(country.language));

        break;
      case '3':
        const cities = await execQuery(
          await createJoin(
            'countrylanguage.language',
            'city.Name',
            'city',
            'countrylanguage',
            'city.countryCode',
            'countrylanguage.CountryCode',
            'countrylanguage.Language',
            language,
          ),
        );
        console.log(cities.length, ' cities speak ', language, ' language.');
        break;
      case '4':
        const languages = await execQuery(await createQueryFour(language, region));
        if (languages.length == 0) {
          console.log('False');
        } else {
          languages.map(language =>
            console.log(language.language, ' is official language of ', language.Name),
          );
        }
        break;
      case '5':
        const continentLanguages = await execQuery(await createQueryFive());
        continentLanguages.map(language =>
          console.log(language.continent, ' has ', language.count, ' languages spoken.'),
        );
        break;
    }
    connection.end();
  } catch (error) {
    console.log(error, 'ooopsss');
  }
}
main();
