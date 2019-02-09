'use strict';

const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function queries_on_new_world() {
  connection.connect();
  try {
    console.log(
      'Please choose the number of the question and the required information (if any): \n ',
    );
    console.log('1- What is the capital of country X ?');
    console.log('2- List all the languages spoken in the region Y');
    console.log('3- Find the number of cities in which language Z is spoken');
    console.log(
      '4- Are there any countries that have the same official language and the same region',
    );
    console.log('5- List all the continents with the number of languages spoken in each continent');
    switch (process.argv[2]) {
      case '1':
        await execQuery(capital(process.argv[3]));
        break;
      case '2':
        await execQuery(language_list(process.argv[3]));
        break;
      case '3':
        await execQuery(cities(process.argv[3]));
        break;
      case '4':
        execQuery(officialLanguageAndRegion());
        break;
      case '5':
        await execQuery(continent());
        break;
      default:
        console.log('Please choose another number.');
    }

    function capital(country) {
      return `SELECT Name, Name FROM country,city WHERE country.Name = ${country} AND country.Capital=city.ID ;`;
    }
    function language_list(region) {
      return `SELECT country.Name, Language FROM countrylanguage, country WHERE Code = countryCode AND Region = ${region};`;
    }

    function cities(language) {
      return `SELECT COUNT(Name) FROM city, countrylanguage WHERE city.countryCode = countrylanguage.countryCode AND countrylanguage.Language = ${language};`;
    }

    function officialLanguageAndRegion() {
      return `select Name FROM country WHERE country.Code = countrylanguage.CountryCode AND countrylanguage.IsOfficial = 'T');`;
    }

    function continent() {
      return `SELECT Continent, COUNT(Language) FROM country, countrylanguage WHERE code.country = countryCode.countrylanguage ;`;
    }
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

queries_on_new_world();
