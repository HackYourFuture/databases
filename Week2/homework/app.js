#!/usr/bin/env node
'use strict';

const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyf_Pass1',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));

const command = process.argv[2];
const query = process.argv[3];

connection.connect();

try {
  switch (command) {
    case 'capital':
      const capitalOfCountry = `SELECT c.Name,ci.Name FROM country AS c 
                                LEFT JOIN city AS ci
                                ON c.Capital=ci.ID
                                WHERE c.Name=?;`;
      execQuery(capitalOfCountry, query).then(results => {
        console.log(`Capital city of ${query} is: ${results[0].Name}`);
      });
      break;
    case 'region-lang':
      const languagesByRegion = `SELECT cl.Language,c.Region FROM countrylanguage AS cl 
                              LEFT JOIN country AS c 
                              ON cl.CountryCode=c.Code
                              WHERE c.Region=?;`;
      execQuery(languagesByRegion, query).then(results => {
        for (let r of results) {
          console.log(r.Language);
        }
      });
      break;
    case 'lang-city':
      const citiesOfLanguage = `SELECT COUNT(c.Name) AS total, cl.Language FROM city AS c 
                              LEFT JOIN countrylanguage AS cl
                              ON c.CountryCode=cl.CountryCode
                              WHERE cl.Language=? 
                              GROUP BY cl.Language;`;
      execQuery(citiesOfLanguage, query).then(results => {
        console.log(results[0].total);
      });
      break;
    case 'lang-info':
      const sameLanguages = `SELECT cl.language, c.Name FROM countrylanguage AS cl 
                            LEFT JOIN country AS c
                            ON c.Code=cl.CountryCode;`;
      execQuery(sameLanguages)
        .then(results => {
          for (let r of results) {
            console.log(`${r.language} - ${r.Name}`);
          }
        })
        .catch(() => {
          console.log(false);
        });
      break;
    case 'region-info':
      const regionsAndCountries = `SELECT Name, Region FROM country 
                                 GROUP BY Region,Name;`;
      execQuery(regionsAndCountries)
        .then(results => {
          for (let r of results) {
            console.log(`${r.Name} - ${r.Region}`);
          }
        })
        .catch(() => {
          console.log(false);
        });
      break;
    case 'total-langs':
      const numberOfLangsOfContinents = `SELECT c.Continent, COUNT(cl.language) AS number_of_languages 
                                        FROM country AS c 
                                        LEFT JOIN countrylanguage AS cl 
                                        ON cl.CountryCode=c.Code 
                                        GROUP BY c.Continent 
                                        ORDER BY COUNT(cl.language) DESC;`;
      execQuery(numberOfLangsOfContinents).then(results => {
        for (let r of results) {
          console.log(`${r.Continent} - ${r.number_of_languages}`);
        }
      });
      break;
    case 'help':
    default:
      console.log(`
        Something went wrong or you have asked for help.

        Usage:
            node app.js {command} {query} // query is optional

        Commands:
          - capital: shows the capital city of that asked country(query needed),
          - region-lang: shows the languages of that asked region(query needed),
          - lang-city: shows the spoken languages of that asked city(query needed),
          - lang-info: shows the spoken languages of each country (no query needed),
          - region-info: shows the countries of each region (no query needed),
          - total-langs: shows the total number of languages of each continent (no query needed)
      `);
      break;
  }
} catch (err) {
  console.log(err);
}

connection.end();
