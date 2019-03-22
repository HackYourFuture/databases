const prompt = require('prompt');
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

async function queryDatabase() {
  prompt.start();

  try {
    console.log(`

      Select a country to add a language.

      Make your choice =>>
    `);
    const country = await input(['country']);
    let country_name = country.country;
    const select_query = `SELECT country, count(language) AS numberOfLanguage FROM (SELECT e1.name AS Country, e2.language AS Language FROM country AS e1 LEFT JOIN countrylanguage AS e2 ON (e1.code = e2.countrycode)) AS x WHERE country = ? GROUP BY country;`;

    const languages = [
      {
        CountryCode: 'TUR',
        Language: 'xxxx',
        IsOfficial: 'F',
        Percentage: 0,
      },
    ];

    connection.connect();
    let results = await execQuery(select_query, country_name);
    let numberOfLanguages = [];
    for (r of results) {
      numberOfLanguages.push(JSON.parse(JSON.stringify(r.numberOfLanguage)));
    }
    if (numberOfLanguages[0] >= 10) {
      console.log(`
      Number of spoken languages for the selected country is greater then 9!
      `);
    } else {
      languages.forEach(async language => {
        await execQuery('INSERT INTO countrylanguage SET ?', language);
      });
      for (r of results) {
        console.log(JSON.parse(JSON.stringify(r)));
      }
    }
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

queryDatabase();
