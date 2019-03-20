'use strict';
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser2',
  password: 'hyfpassword',
  database: 'new_world',
});

const queryFunctions = {
  help: () => {
    console.log('You can use this program to learn more about countries.');
  },
  learnCapital: countryName => {
    connection.execute(
      'SELECT city.Name FROM city INNER JOIN country ON country.Capital = city.ID WHERE country.Name = ?',
      [countryName],
      (err, results, fields) => {
        if (err) throw err;
        console.log(`The capital of ${countryName} is ${results[0].Name}`);
      }
    );
    connection.end();
  },
  learnSpokenLanguage: regionName => {
    connection.execute(
      'SELECT DISTINCT countrylanguage.Language FROM countrylanguage JOIN country ON country.Code = countrylanguage.CountryCode AND country.Region = ?',
      [regionName],
      (err, results, fields) => {
        if (err) throw err;
        console.log(
          `The spoken languages in ${regionName} region are: ${Array.from(results).map(
            language => '\n' + language.Language
          )}`
        );
      }
    );
    connection.end();
  },
  findCities: languageName => {
    connection.execute(
      'SELECT DISTINCT COUNT(city.ID) FROM city JOIN countrylanguage ON city.CountryCode = countrylanguage.CountryCode AND countrylanguage.Language = ?',
      [languageName],
      (err, results, fields) => {
        if (err) throw err;
        console.log(
          `The number of cities in which ${languageName} is spoken: ${Object.values(results[0])}`
        );
      }
    );
    connection.end();
  },
  findSimilarCountriesByOfficialLanguage: () => {
    connection.query(
      'SELECT DISTINCT country.Name FROM countrylanguage A, countrylanguage B, country WHERE A.CountryCode = country.Code AND A.IsOfficial = "T" AND A.Language = B.Language',
      (err, results, fields) => {
        if (err) throw err;
        console.log(results);
        const countryNames = Array.from(results).map(country => '\n' + country.Name);
        console.log(
          `All of these countries have official language that at least a different country has the same official language: ${countryNames}`
        );
      }
    );
    connection.end();
  },
  findSimilarCountriesByRegion: () => {
    connection.query(
      'SELECT DISTINCT A.Name, A.Region FROM country A, country B WHERE A.Region = B.Region',
      (err, results, fields) => {
        if (err) throw err;
        console.log(results);
      }
    );
    connection.end();
  },
  listContinents: () => {
    connection.query(
      'SELECT DISTINCT Continent, COUNT(Language) AS Language FROM country INNER JOIN countrylanguage ON country.Code = countrylanguage.CountryCode GROUP BY Continent',
      (err, results, fields) => {
        if (err) throw err;
        console.log(
          `The language number that is spoken in the continents: ${Array.from(results).map(
            continent => '\n' + continent.Continent + ' : ' + continent.Language
          )}`
        );
      }
    );
    connection.end();
  },
};

module.exports = queryFunctions;
