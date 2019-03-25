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
    const message =
      '\n' +
      '*****************************************************************************************' +
      '\n' +
      'To use this application, please use the below directions: ' +
      '\n' +
      '-----------------------------------------------------------------------------------------' +
      '\n' +
      '1-  To learn the capital of a country: 1 <countryName>' +
      '\n' +
      '2-  To list all the languages spoken in a specific region: 2 <regionName>' +
      '\n' +
      '3-  To find the number of cities in which a specific language is spoken: 3 <languageName>' +
      '\n' +
      '4-  To list countries that have same official language with given country in the same region: 4 <regionName> <countryName>' +
      '\n' +
      '5-  To list all the continents with the number of languages spoken in each continent: 5' +
      '\n' +
      '\n' +
      '*****************************************************************************************' +
      '\n';

    console.log(message);
    connection.end();
  },
  learnCapital: countryName => {
    connection.connect();
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
    connection.connect();
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
    connection.connect();
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
  findSimilarCountriesByOfficialLanguage: (regionName, languageName) => {
    connection.connect();
    const sqlProcedure = `    

    CREATE PROCEDURE GetCountries_Reg_lang(region VARCHAR(50),official_lang VARCHAR(50))
    BEGIN
    DECLARE message varchar(300);
    DECLARE count_countries int;
     SELECT COUNT(*) INTO count_countries from country JOIN countrylanguage ON country.code = countrylanguage.CountryCode
      WHERE countrylanguage.language = official_lang
      and country.Region = region
      and IsOfficial = 'T';
   
   if (count_countries > 1) then
      SELECT country.Name FROM country JOIN countrylanguage ON country.code = countrylanguage.CountryCode
      WHERE countrylanguage.language =official_lang
      and country.Region = region
      and IsOfficial = 'T';
    else
        SET message ='FALSE: No countries on the given region with same official language';
        SET lc_messages=message;
        SIGNAL SQLSTATE '45000';
     end if;
    END;

        `;
    connection.query(`DROP PROCEDURE IF EXISTS GetCountries_Reg_lang;`, err => {
      if (err) throw err;
      console.log('Procedure is deleted...');
    });
    connection.query(sqlProcedure, err => {
      if (err) throw err;
      console.log('Procedure is added...');
    });
    const sql = `CALL GetCountries_Reg_lang(?, ?);`;
    connection.execute(sql, [regionName, languageName], (err, results) => {
      if (err) {
        try {
          if (err) throw err;
        } catch (err) {
          console.log('FALSE: No countries on the given region with same official language');
        }
      } else {
        console.log(
          `${results[0].map(country => '\n' + country.Name)} \nare speaking same language.`
        );
      }
    });
    connection.end();
  },
  listContinents: () => {
    connection.connect();
    connection.query(
      'SELECT DISTINCT Continent, COUNT(DISTINCT Language) AS Language FROM country INNER JOIN countrylanguage ON country.Code = countrylanguage.CountryCode GROUP BY Continent',
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
  makeAlert: () => {
    console.log('Please write a number between 1 and 5');
    connection.end();
  },
};

module.exports = queryFunctions;
