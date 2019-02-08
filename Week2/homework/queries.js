'use strict';

const mysql = require('mysql');
const util = require('util');
const fs = require('fs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));

function findCapital(countryName) {
  const country = connection.escape(countryName);
  (async function() {
    try {
      const result = await execQuery(
        'select city.name from city, country where city.id = country.capital and country.name = ' +
          country,
      );
      console.log(result);
    } catch (err) {
      throw err;
    }
  })();
}
function listLanguages(regionName) {
  const region = connection.escape(regionName);
  (async function() {
    try {
      const result = await execQuery(
        'select Language from countrylanguage, country where countrylanguage.CountryCode = country.Code and country.region = ' +
          region,
      );
      console.log(result);
    } catch (err) {
      throw err;
    }
  })();
}

function findNumberOfCities(spokenLanguage) {
  const language = connection.escape(spokenLanguage);
  (async function() {
    try {
      const result = await execQuery(
        'select count(name) as "The number of cities is" from city, countryLanguage where city.countryCode = countryLanguage.countryCode and language = ' +
          language,
      );
      console.log(result);
    } catch (err) {
      throw err;
    }
  })();
}

function findCountriesSameLanguageSameRegion(officialLanguage) {
  const language = connection.escape(officialLanguage);
  (async function() {
    try {
      const result = await execQuery(
        'select name from country join countrylanguage on country.code = countrylanguage.countrycode where isOfficial = "T" and Language = ' +
          language,
      );
      if (result.length > 0) {
        console.log(result);
      } else {
        console.log(false);
      }
    } catch (err) {
      throw err;
    }
  })();
}

function listContinents() {
  (async function() {
    try {
      const result = await execQuery(
        'select continent, count(language) as "Number of languages" from country join countrylanguage on country.code = countrylanguage.countrycode group by continent',
      );
      console.log(result);
    } catch (err) {
      throw err;
    }
  })();
}

const commandsArray = [process.argv[2], process.argv[3]];

connection.connect();

switch (commandsArray[0]) {
  case 'c':
    findCapital(commandsArray[1]);
    break;
  case 'l':
    listLanguages(commandsArray[1]);
    break;
  case 'nc':
    findNumberOfCities(commandsArray[1]);
    break;
  case 'cslsr':
    findCountriesSameLanguageSameRegion(commandsArray[1]);
    break;
  case 'acnl':
    listContinents();
    break;
  default:
    console.log(fs.readFileSync('help.txt', 'utf8'));
}

connection.end();
