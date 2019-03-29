'use strict';

const config = require('./config');
const command = require('./command');
const help = require('./help');

async function typeQuery() {
  try {
    switch (command[0]) {
      case '1':
        if (!command[1]) {
          console.log(`kindly type the country_name after 1 [......]`);
        } else {
          const country_input = command[1];
          const q1 = `SELECT city.Name AS the_Capital
          FROM country JOIN city ON (country.Code = city.CountryCode)
          WHERE country.capital = city.ID AND country.name = ?;`;
          await config.query(q1, country_input, (error, [result]) => {
            if (error) console.log(`\n${error.message}`);
            const result_values = Object.values(result);
            result_values.forEach(res => console.log(`\nThe capital is ${res}`));
          });
        }
        break;

      case '2':
        if (!command[1]) {
          console.log(`kindly type the region_name after 2 [......]`);
        } else {
          const region_input = command[1];
          const q2 = `SELECT country.Name AS country, countryLanguage.language AS language FROM country JOIN countryLanguage ON (country.Code = countryLanguage.CountryCode)
        WHERE country.Region = ?;`;
          await config.query(q2, region_input, (error, result) => {
            if (error) console.log(error.message);
            const result_values = Object.values(result);
            result_values.forEach((res, index) =>
              console.log(`\n${index + 1}) ${res.country}: ${res.language}`)
            );
          });
        }
        break;

      case '3':
        if (!command[1]) {
          console.log(`Kindly type the language_name after 3 [......]`);
        } else {
          const language_input = command[1];
          const q3 = `SELECT COUNT(Name) FROM city c JOIN countryLanguage cl ON (c.CountryCode = cl.CountryCode) AND cl.Language = ?;`;
          await config.query(q3, language_input, (error, result) => {
            if (error) console.log(error.message);
            const results = JSON.parse(JSON.stringify(result));
            results.forEach(res =>
              console.log(`The number of cities speaking ${language_input} = ${res['COUNT(Name)']}`)
            );
          });
        }
        break;

      case '4':
        const type_help = `Kindly type: 4 region_name language_name then press enter.`;
        const q4 = `SElECT Name FROM country c JOIN countryLanguage cl ON (c.Code = cl.CountryCode AND cl.IsOfficial = 'T') WHERE c.Region = ? AND cl.Language = ?;`;
        const region_input = command[1];
        const language_input = command[2];
        if (!command[1]) {
          console.log(type_help);
        } else {
          if (!command[2]) {
            console.log(type_help);
          } else {
            await config.query(q4, [region_input, language_input], (error, result) => {
              if (error) {
                console.log(error.message);
              } else {
                const results = JSON.parse(JSON.stringify(result));
                results.forEach((res, index) => console.log(`\n${index + 1}) ${res.Name}`));
              }
            });
          }
        }
        break;

      case '5':
        const q5 = `SElECT Continent, COUNT(Language) FROM country c LEFT JOIN countryLanguage cl ON (c.Code = cl.CountryCode) GROUP BY Continent;`;
        await config.query(q5, (error, result) => {
          if (error) console.log(error.message);
          const results = JSON.parse(JSON.stringify(result));
          results.forEach((res, index) =>
            console.log(
              `\n${index + 1}) ${res.Continent}: has (${res['COUNT(Language)']}) spoken languages.`
            )
          );
        });
        break;

      default:
        console.log(help);
    }
  } catch (err) {
    console.log(err.message);
  }

  config.end();
}
typeQuery();
