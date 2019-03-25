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
  let input_number = '';
  prompt.start();
  try {
    console.log(`

      Options:

      1........What is the capital of country X ? (Accept X from user)
      2........List all the languages spoken in the region Y (Accept Y from user)
      3........Find the number of cities in which language Z is spoken (Accept Z from user)
      4........Accept the region and language from the user. Are there any countries in this region with the given language as the official language ? If yes, display those countries. If no, display FALSE. E.g. (A) input region : 'Western Europe' and input language : 'Dutch' output should be Belgium and Netherlands (B) input region : 'Western Europe' and input language : 'Hindi' output should be 'FALSE'
      5........List all the continents with the number of languages spoken in each continent

      Make your choice =>>
    `);
    const options = await input(['option']);
    input_number = options.option;

    switch (input_number) {
      case '1':
        const firstOption = await input(['country']);
        let country = firstOption.country;
        const firstQuery = `SELECT e1.Name AS Country, e2.Name AS Capital FROM country AS e1 LEFT JOIN city AS e2 ON (e1.Capital = e2.ID) WHERE e1.name = ?;`;
        connection.connect();
        let resultsFirst = await execQuery(firstQuery, country);
        console.log(`
        `);
        for (r of resultsFirst) {
          console.log(JSON.parse(JSON.stringify(r)));
        }
        console.log(`
        `);
        connection.end();
        break;

      case '2':
        const secondOption = await input(['region']);
        let region = secondOption.region;
        const secondQuery = `SELECT region, language FROM (SELECT e1.region AS region, e2.Language AS Language FROM country AS e1 LEFT JOIN (SELECT * FROM countrylanguage) AS e2 ON (e1.Code = e2.CountryCode)) AS regionsAndLanguages WHERE region = ? GROUP BY region, language;`;
        connection.connect();
        let resultsSecond = await execQuery(secondQuery, region);
        console.log(`
        `);
        for (r of resultsSecond) {
          console.log(JSON.parse(JSON.stringify(r)));
        }
        console.log(`
        `);
        connection.end();
        break;

      case '3':
        const thirdOption = await input(['language']);
        let language = thirdOption.language;
        const thirdQuery = `SELECT COUNT(*) AS Cities FROM (SELECT e1.Language AS Language, e2.Name AS City FROM countrylanguage AS e1 LEFT JOIN city AS e2 ON (e1.CountryCode = e2.CountryCode) WHERE e1.Language = ?) AS Number_of_Cities;`;
        connection.connect();
        console.log(thirdOption);
        let resultsThird = await execQuery(thirdQuery, language);
        console.log(`
        `);
        for (r of resultsThird) {
          console.log(JSON.parse(JSON.stringify(r)));
        }
        console.log(`
        `);
        connection.end();
        break;

      case '4':
        const fourthOption_region = await input(['Region']);
        let selectedRegion = fourthOption_region.Region;
        const fourthOption_language = await input(['Language']);
        let selectedLanguage = fourthOption_language.Language;
        const fourthQuery = `
        CALL GetCountries_Reg_lang (?, ?);
        `;
        connection.connect();
        console.log(fourthOption_region);
        console.log(fourthOption_language);
        let params = [selectedRegion, selectedLanguage];
        let resultsFourth = await execQuery(fourthQuery, params);
        console.log(`
        `);
        for (r of resultsFourth) {
          console.log(JSON.parse(JSON.stringify(r)));
        }
        console.log(`
        `);
        connection.end();
        break;

      case '5':
        const fifthQuery = `SELECT continent, COUNT(language) AS Languages FROM (SELECT e1.Continent AS Continent, e2.Language AS Language FROM country AS e1 LEFT JOIN (SELECT * FROM countrylanguage WHERE isOfficial = 'T') AS e2 ON (e1.Code = e2.CountryCode)) AS l GROUP BY continent;`;
        connection.connect();
        let resultsFifth = await execQuery(fifthQuery);
        console.log(`
          `);
        for (r of resultsFifth) {
          console.log(JSON.parse(JSON.stringify(r)));
        }
        console.log(`
          `);
        connection.end();
        break;

      default:
        console.log(`
        Please make a valid choice!
        `);
        break;
    }
  } catch (error) {
    console.error(error);
  }
}

queryDatabase();
